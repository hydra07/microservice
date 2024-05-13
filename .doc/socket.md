# Socket

SocketIO => {
on('event') => listen event,
emit('event') => send event,
emit('event', data) => send event with data,

}

## Server

```typescript
io.on('connection', (socket) => {
  console.log('a user connected'); //khi connect thì sẽ console.log ra
  socket.on('event', (data) => {
    console.log(data); //client đang emit event với data => server nhận được data và console.log ra
  });
  socket.emit('getData', { data: 'data' }); //server emit event getData với data là

  socket.on('disconnect', () => {
    console.log('user disconnected'); //khi disconnect thì sẽ console.log ra
  });
});
```

## Client

```typescript
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('connected'); //khi connect thì sẽ console.log ra
});

socket.on('getData', (data) => {
  console.log(data); //server emit event getData với data => client nhận được data và console.log ra
});

socket.emit('event', { data: 'data' }); //client emit event với data là
```
