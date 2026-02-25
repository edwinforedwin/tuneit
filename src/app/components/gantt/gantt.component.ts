import { Component, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Ticket {
  id: string;
  title: string;
  start: string;
  end: string;
  color?: string;
}

@Component({
  selector: 'app-gantt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gantt.component.html',
  styleUrl: './gantt.component.css'
})
export class GanttComponent implements OnChanges {
  @Input() tickets: Ticket[] = [];

  // chart computed
  chartStart = new Date();
  chartEnd = new Date();
  totalDays = 1;
  // per-day Date objects for rendering
  dayDates: Date[] = [];
  // month spans for header: { label, startIdx, span }
  monthSpans: Array<{ label: string; start: number; span: number }> = [];

  // interaction
  pixelsPerDay = 36; // zoomable
  offsetDays = 0; // panning offset in days
  // effective pixels per day (may expand to fill container) and svg view width
  effectivePixelsPerDay = this.pixelsPerDay;
  viewWidth = 0;
  // chart area width (excluding label column)
  chartWidth = 0;
  // left label column width (px)
  labelColumnWidth = 220;

  // pan state
  private panning = false;
  private panStartX = 0;
  private panStartOffset = 0;

  // hover / pointer indicator
  hoverX = 0; // content coordinates
  hoverDate = '';
  showHover = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tickets']) {
      this.computeRange();
    }
  }

  private computeRange() {
    if (!this.tickets || this.tickets.length === 0) {
      this.chartStart = new Date();
      this.chartEnd = new Date();
      this.totalDays = 1;
      return;
    }
    const starts = this.tickets.map(t => new Date(t.start));
    const ends = this.tickets.map(t => new Date(t.end));
    this.chartStart = new Date(Math.min(...starts.map(d => d.getTime())));
    this.chartEnd = new Date(Math.max(...ends.map(d => d.getTime())));
    this.chartStart.setDate(this.chartStart.getDate() - 2);
    this.chartEnd.setDate(this.chartEnd.getDate() + 2);
    const msPerDay = 24 * 60 * 60 * 1000;
    this.totalDays = Math.max(1, Math.ceil((this.chartEnd.getTime() - this.chartStart.getTime()) / msPerDay));
    // ensure offset is in-range
    this.offsetDays = Math.max(this.offsetDays, -this.totalDays);
    this.buildDayDatesAndMonths();
    this.updateViewWidth();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.updateViewWidth();
  }

  private updateViewWidth() {
    const container = document.querySelector('.gantt-container') as HTMLElement | null;
    if (container && this.totalDays > 0) {
      const chartArea = Math.max(200, container.clientWidth - this.labelColumnWidth);
      this.effectivePixelsPerDay = Math.max(this.pixelsPerDay, chartArea / this.totalDays);
      this.chartWidth = Math.max(this.totalDays * this.effectivePixelsPerDay, chartArea);
      this.viewWidth = this.labelColumnWidth + this.chartWidth;
    } else {
      this.effectivePixelsPerDay = this.pixelsPerDay;
      this.chartWidth = this.totalDays * this.effectivePixelsPerDay;
      this.viewWidth = this.totalDays * this.effectivePixelsPerDay + this.labelColumnWidth;
    }
    // ensure offset remains clamped
    const containerEl = document.querySelector('.gantt-container') as HTMLElement | null;
    if (containerEl) this.clampOffsetForContainer(containerEl);
  }

  private buildDayDatesAndMonths() {
    this.dayDates = [];
    for (let i = 0; i < this.totalDays; i++) {
      const d = new Date(this.chartStart);
      d.setDate(d.getDate() + i);
      this.dayDates.push(d);
    }

    // build month spans
    this.monthSpans = [];
    if (this.dayDates.length === 0) return;
    let cur = this.dayDates[0];
    let start = 0;
    for (let i = 1; i <= this.dayDates.length; i++) {
      const d = this.dayDates[i];
      if (i === this.dayDates.length || (d.getMonth() !== cur.getMonth() || d.getFullYear() !== cur.getFullYear())) {
        const span = i - start;
        const label = `${cur.toLocaleString(undefined, { month: 'short' })} - ${cur.getFullYear()}`;
        this.monthSpans.push({ label, start, span });
        if (i < this.dayDates.length) {
          cur = this.dayDates[i];
          start = i;
        }
      }
    }
  }

  get totalWidth() {
    return this.totalDays * this.pixelsPerDay;
  }

  daysFromStart(dateStr: string) {
    const d = new Date(dateStr);
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((d.getTime() - this.chartStart.getTime()) / msPerDay);
  }

  daysLength(startStr: string, endStr: string) {
    const s = new Date(startStr);
    const e = new Date(endStr);
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / msPerDay));
  }

  zoom(factor: number) {
    const next = Math.max(12, Math.min(120, Math.round(this.pixelsPerDay * factor)));
    this.pixelsPerDay = next;
    this.updateViewWidth();
  }

  resetZoom() {
    this.pixelsPerDay = 36;
    this.offsetDays = 0;
    this.updateViewWidth();
  }

  // Pointer-based panning
  startPan(evt: PointerEvent) {
    evt.preventDefault();
    // capture pointer on the container to avoid native scrolling and ensure labels stay fixed
    const container = (evt.currentTarget as HTMLElement) || (evt.target as HTMLElement | null);
    try { (container as Element)?.setPointerCapture(evt.pointerId); } catch {}
    this.panning = true;
    this.panStartX = evt.clientX;
    this.panStartOffset = this.offsetDays;
    this.updateHover(evt);
  }

  onPan(evt: PointerEvent) {
    if (!this.panning) return;
    const dx = evt.clientX - this.panStartX;
    // convert dx to days: make content follow pointer (drag right => chart moves right)
    this.offsetDays = this.panStartOffset + dx / this.effectivePixelsPerDay;
    const target = evt.currentTarget as HTMLElement | null || (evt.target as HTMLElement | null);
    const container = target && target.closest('.gantt-container') as HTMLElement | null;
    if (container) this.clampOffsetForContainer(container);
    this.updateHover(evt);
  }

  endPan(evt: PointerEvent) {
    try {
      const container = (evt.currentTarget as HTMLElement) || (evt.target as HTMLElement | null);
      (container as Element)?.releasePointerCapture(evt.pointerId);
    } catch {}
    this.panning = false;
    // clamp offset to reasonable bounds
    const target = evt.currentTarget as HTMLElement | null || (evt.target as HTMLElement | null);
    const container = target && target.closest('.gantt-container') as HTMLElement | null;
    if (container) this.clampOffsetForContainer(container);
    // keep hover visible briefly while dragging ends
    setTimeout(() => { this.showHover = false; }, 300);
  }

  onPointerMove(evt: PointerEvent) {
    if (this.panning) {
      this.onPan(evt);
    } else {
      this.updateHover(evt);
    }
  }

  onPointerLeave(evt: PointerEvent) {
    // hide hover when pointer leaves the container
    this.showHover = false;
    if (this.panning) {
      this.endPan(evt);
    }
  }

  private updateHover(evt: PointerEvent) {
    // find container element and compute content x
    const target = evt.currentTarget as HTMLElement | null || (evt.target as HTMLElement | null);
    const container = target && target.closest('.gantt-container') as HTMLElement | null;
    if (!container) {
      this.showHover = false;
      return;
    }
    const rect = container.getBoundingClientRect();
    const xInContent = evt.clientX - rect.left + container.scrollLeft;
    // adjust for left label column so chart X=0 is chart area start
    const chartX = xInContent - this.labelColumnWidth;
    // hoverX is in container coordinates (include label column offset)
    this.hoverX = chartX + this.labelColumnWidth;
    // hide hover if outside the rendered chart area
    if (chartX < 0 || chartX > this.chartWidth) {
      this.showHover = false;
      return;
    }
    // compute day index relative to chartStart and offsetDays
    const relativeDay = Math.floor(chartX / this.effectivePixelsPerDay) - Math.floor(this.offsetDays);
    // if computed day is outside available days, hide hover
    if (relativeDay < 0 || relativeDay >= this.totalDays) {
      this.showHover = false;
      return;
    }
    const d = new Date(this.chartStart);
    d.setDate(d.getDate() + relativeDay);
    // format exact calendar date DD-MM-YY
    const yy = String(d.getFullYear() % 100).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    this.hoverDate = `${dd}-${mm}-${yy}`;
    this.showHover = true;
  }

  private clampOffsetForContainer(container: HTMLElement) {
    // compute min offset so the chart always covers the container horizontally
    // account for reserved left label column when computing visible chart area
    const chartVisibleWidth = Math.max(0, container.clientWidth - this.labelColumnWidth);
    const min = Math.min(0, chartVisibleWidth / this.effectivePixelsPerDay - this.totalDays);
    const max = 0;
    this.offsetDays = Math.max(min, Math.min(this.offsetDays, max));
  }
  // utility for template
  daysArray() {
    return Array(this.totalDays).fill(0).map((_, i) => i);
  }

  dateAt(idx: number) {
    const d = this.dayDates[idx];
    if (!d) return '';
    const yy = String(d.getFullYear() % 100).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${dd}-${mm}-${yy}`;
  }

  dayNumber(idx: number) {
    const d = this.dayDates[idx];
    if (!d) return '';
    return String(d.getDate()).padStart(2, '0');
  }
}
