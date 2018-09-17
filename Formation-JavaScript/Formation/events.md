# Events
Based on HTML events.

2 kind of events :
- browser events
- manual events

## type
[Events lists](https://developer.mozilla.org/en-US/docs/Web/Events)

## old syntax
element.event = function();

limitation :
``` javascript
button.onclick = doSomething(); //will not execute
button.onclick = doSomethingElse(); //only this one will execute. We are rewriting the event.
```

## new syntax
element.addEventListener(type, listener, options)

advantages :
``` javascript
button.addEventListener('click', doSomething); //both will execute
button.addEventListener('click', doSomethingElse); //both will execute

//events listeners can be removed
button.removeEventListener('click', doSomething);
```

Events listeners also have options.

### options
once : If true, the listener would be automatically removed when invoked.
element.addEventListener(type, listener, {once: true});

passive: if true, the listener will never call preventDefault();
element.addEventListener(type, listener, {passive: true});
