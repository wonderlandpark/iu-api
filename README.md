# IU API

I'm a big fan of [IU](https://www.instagram.com/dlwlrma/).

I needed an API to show random images of her.

## BASE URL

```
https://iu.junseo.me
```

## Endpoints

### `GET` /images/profile

Profile Image of IU.

### `GET` /images/gif

GIF Image of IU.

## RateLimit

You could send request `1 req / 2 seconds`.

### Headers

These are Ratelimit headers.

| Header | Description |
|--------|-------------|
| Rate-Limit-Remaining | containing the requests quota in the time window |
| RateLimit-Remaining | containing the remaining requests quota in the current window |
| RateLimit-Reset | containing the time remaining in the current window, specified in seconds or as a timestamp |

## Contributing

If you would like to add new images, please create a issue and let me know.
