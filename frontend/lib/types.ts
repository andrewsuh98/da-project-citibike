import { PlotParams } from 'react-plotly.js';

export interface SummaryStats {
  total_trips: number;
  date_range: {
    start: string;
    end: string;
  };
  total_days: number;
  avg_trips_per_day: number;
  user_distribution: {
    member: number;
    casual: number;
    member_percentage: number;
  };
  bike_distribution: {
    classic_bike: number;
    electric_bike: number;
    electric_percentage: number;
  };
  trip_duration: {
    median_minutes: number;
    q25_minutes: number;
    q75_minutes: number;
    mean_minutes: number;
    max_minutes: number;
    max_hours: number;
  };
  trip_distance: {
    max_km: number;
    max_miles: number;
  };
  peak_hour: number;
  peak_hour_trips: number;
}

export interface PlotlyData {
  data: PlotParams['data'];
  layout: PlotParams['layout'];
}
