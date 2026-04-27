# F1-EPG

Very simple EPG generator for Formula 1 events with series customization and [game-thumbs](https://github.com/sethwv/game-thumbs) support. game-thumbs v1.8.0 or above required.

## Usage
This service only exposes one route:
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

## Environment Variables
| Var | Type | Default | Description |
| -- | -- | -- | -- |
| `PORT` | Int | 3000 | Port to expose the webserver |
| `EPG_DAYS` | Int | 14 | Number of days of data to include in the generated EPG file |
| `GAME_THUMBS_URL` | String | null | URL with appropriate subpath for game-thumbs. Recommended path is either `/f1/thumb` or `/f1/cover`. See game-thumbs docs for more detail |
| `ASPECT` | String | null | Optional aspect ratio to provide to game-thumbs |
