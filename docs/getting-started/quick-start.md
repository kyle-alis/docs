---
title: "Quick Start"
next: /guides/make-your-first-request
---
# Quick Start

## The alis.exchange philosophy

 // FLUFFY COPY //

## What are protobufs?

Protos are a language agnostic way of designing resources and their associated methods. Protos are then used to generate language specific methods and object definitions. Working with a proto defined API feels as easy as importing a package or library.


Read more on [protos](/other-resources/other-resources.md).
## Try it out!

Products on **alis.exchange** represent digital assets built with an API-first strategy, to be utilised within an organisation or as a B2B/B2C product. Products are defined by a set of protos serving as the golden source of truth.

Consider a defined Book resource with _name_, _display name_, _authors_ and _publishers_ as fields.

```protobuf
//A book resource
message Book {

	//Name of the book in the format: books/{book}.
	string name = 1 [(google.api.field_behavior) = OUTPUT_ONLY];

	//The display name of the book.
	string display_name = 2 [(google.api.field_behavior) = REQUIRED];

	//The authors of the book.
	repeated string authors = 3 [(google.api.field_behavior) = REQUIRED];

	//The publisher of the book
	string publisher = 4 [(google.api.field_behavior) = REQUIRED];
}
```

Methods for resources are defined as follow.

```protobuf
// List all available books.
// Books are listed in Descending order.
rpc ListBooks(ListBooksRequest) returns (ListBooksResponse) {
    option (google.api.http) = {
        get: "/resources/store/v1/books"
    };
}
```
With a defined resource and a method you are ready to make your first request.  Try making a request to the resource in the <a href="https://alisx-codespacesplayg-5aghydnu51y.ws-eu38.gitpod.io/" target="blank">cloud IDE</a>.

Open the cloud IDE and choose the folder with your preferred coding language.

::: details go
Open a terminal and ensure you are in the _go_ directory. 

```sh
$ cd go
```

Run `go run *.go` to make your first request.
:::

::: details R
Open a terminal and ensure you are in the _R_ directory. 

```sh
$ cd R
```

How to make request steps
:::

