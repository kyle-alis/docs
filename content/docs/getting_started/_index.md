---
weight: 1
bookFlatSection: true
title: "Getting Started"
---

# Getting Started

## The alis.exchange philosophy

One of the biggest challenges faced within and across organisations is standardised communication. Adopting a resource-oriented design paradigm as a core part of **alis.exchange**, has helped to establish a consistent standard of communication across everything that happens on the exchange.

Resource oriented design is a set of guidelines to specifying remote procedure call [(RPC)](https://en.wikipedia.org/wiki/Remote_procedure_call) API's. The core to these API's are individually-named *resources* and the relationships between them. Operations are executed on these resources through a set of *methods*.

One of the key characteristics of Resource oriented design is the emphasis on resources, the data models, instead of the methods, the functionality. An API designed with Resource oriented approach would typically expose a large number of resources and a small number of methods.

## What are protobufs?
Protos are a language agnostic way of designing resources and their associated methods. Protos are then used to generate language specific methods and object definitions. Working with a proto defined API feels as easy as importing a package or library.

[Learn more]({{< relref "docs/resources/#protocol-buffers" >}})

## Let’s get building!
### Create the product resource or join an existing product

Conceptually, a product is a thing which describes the provision of some set of resources and services for usage within an organisation, across organizations or as a B2B/B2C offering. You can think of a product as a “job to be done” for the clients of that product.

Each product is a sub-resource of an organization which is responsible for billing and owns and manages users in the organization.

First, click here to open a remote development environment.

In order to create your product run:
```bash
alis product create {org}.{product}
```

In order to start contributing to an existing product, run:
```bash
alis product get {org}.{product}
```

### Let's write a basic proto definition
First let's define a book resource
```protobuf
message Book {
    // The resource name of the Book
    // Format: publishers/{publisher}/books/{book}
    string name = 1;
    // The display name of the book
    string display_name = 2;
}
```
Now let's write a basic method on our resource:
```protobuf
rpc GetBook(GetBookRequest) returns (Book) {
    option (google.api.http) = {
        get: "/v1/{name=publishers/*/books/*}"
    };
    option (google.api.method_signature) = "name";
}
```