# F1-EPG

Very simple EPG generator for Formula 1 events with series customization. This only exposes one route:
```
GET /api/epg/:seriestype
```

the `seriestype` parameter controls how the F1 events are grouped for series recording. The possible values are outlined below:
| Value | Grouping |
| -- | -- |
| all | Configures events so they are all part of the same series. Useful if you want to record all F1 events. |
| weekend | Configures events so all events of any given weekend are grouped together. Helps with potential organization, but means you have to remember to record series every weekend if you want to record everything. |
| type | Configures events to be grouped by type. Useful if, for example, you wanted to only record all races |
| season (default) | Configures events to be grouped by season. All events in a season will be recorded together |
