POST /configure

Body:
```
{
    routes: [
        {
            sourcePath: "/items",
            destinationUrl: "https://example.com/items"
        }
    ],
    clients: [
        {
            clientId: "1234",
            limit: 1000,
            seconds: 10
        }
    ]
}

```