# Redux Notes

<img src="http://i.imgur.com/qhPanYL.jpg">

### Middleware
- function that take an action and depending on action type and action payload, middleware can choose to lets action pass, manipulate the action, logs it, stops it.. 
- someone call action creator, middleware sitting between and waiting
- all action we create, flow through middleware