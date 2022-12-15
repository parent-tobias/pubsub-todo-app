# Todo App

Revisiting the Odin Project's Todo App, with an eye towards *abstraction* and *separation*. Specifically, I wanted to work from the idea that the entire app is a `Collection`, holding a number of "projects" which are, in themselves, also `Collection` things. Each of those projects collect `Todo` objects.

But `Collection` objects are also *Observables*. That is, we can subscribe to particular actions on them: `"add"`, `"remove"` or `"update"`. What does that do for us? We can tell the root `Collection` that we want to listen for its messages, and perform "side effect"-y manipulations *outside* of the data structure.

* We can update the DOM, displaying the changes to the collection.
* We can send the Collection to a backend service, synchronizing to another user.
* We can store the Collection locally, using localStore or IndexDB.
* We can add sound effects, when a delete or add has happened.

By making the collections observable, we can subscribe to them and cause certain behaviors using the data, outside of the data.
