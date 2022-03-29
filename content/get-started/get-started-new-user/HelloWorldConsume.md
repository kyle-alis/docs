# Make your first request to a product 📦

> 👉 Now for the exciting part - actually getting to the code. In this section, you will get a feel for how to
> make use of **alis.exchange** products within your code.


## Background

Given the underlying technologies used, **alis.exchange** give you the ability to generate client libraries for various
supported coding languages. For users of the product, it allows you to programmatically access products natively in your
code without having to wrangle obscure, unpredictable data objects.

Irrespective of the language, this is done in two steps:

1. Establishing a client connection with the server.
2. Using the connection to make a request.

Sound too good to be true? Let us get to the example for you to see this in action.

## Discover new books

Foo is an organisation that builds products on **alis.exchange**. Their flagship book repository product,`BR`, provides
details on digital books which they have available. The product defines a `book` resource as follows and has a
`BookService` with two primary client facing methods that allows clients to list all available books and to get details
on a specific book. The proto for this is as follows:

```protobuf
syntax = "proto3";

package foo.br.resources.books.v1;

import "google/protobuf/empty.proto";
import "google/api/resource.proto";
import "google/api/field_behavior.proto";
import "google/api/client.proto";
import "google/api/annotations.proto";
import "google/protobuf/timestamp.proto";
import "google/protobuf/field_mask.proto";
import "google/type/date.proto";

option go_package = "go.protobuf.foo.alis.exchange/foo/br/resources/books/v1";
// Book service for foo.br.
service BookService {
	// List books.
	// Books are listed in Descending order.
	rpc ListBooks(ListBooksRequest) returns (ListBooksResponse) {
		option (google.api.http) = {
			get: "/resources/store/v1/books"
		};
	}
	// Get a book.
	rpc GetBook(GetBookRequest) returns (Book) {
		option (google.api.http) = {
			get: "/resources/store/v1/{name=books/*}"
		};
		option (google.api.method_signature) = "name";
	}
}

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

// Request message for [foo.br.resources.books.v1.BooksService.CreateBook].
message CreateBookRequest {
	// The book to create
	Book book = 1 [(google.api.field_behavior) = REQUIRED];
}

// Request message for [foo.br.resources.books.v1.BooksService.GetBook].
message GetBookRequest {
	// The book name is the unique identifier across organisations.
	// Format: books/{book}
	string name = 1 [(google.api.field_behavior) = REQUIRED];
}

// Request message for [foo.br.resources.books.v1.BooksService.ListBooks].
message ListBooksRequest {
	// The maximum number of books to return. The service may return fewer than
	// this value.
	// If unspecified, at most 100 books will be returned.
	// The maximum value is 1000; values above 1000 will be coerced to 1000.
	int32 page_size = 1 [(google.api.field_behavior) = OPTIONAL];
}

// Request message for [foo.br.resources.books.v1.BooksService.DeleteBook].
message DeleteBookRequest {
	// The resource name of the Book.
	// Format: books/{book}.
	string name = 1 [(google.api.field_behavior) = REQUIRED];
}

message ListBooksResponse {
	// The books
	repeated Book books = 1 [(google.api.field_behavior) = REQUIRED];
}
```

[//]: # (> ... Did you know that **alis.exchange** can generate documentation from your Proto? Check out the example of this product)

[//]: # (> here: ...,)

We will be making requests to both of these methods in the following sections.

### Establishing client connection

Prior to making the requests, a client connection needs to be established to the server.

The `NewConn` function is generated the CLI when a new neuron is created. It requires the specification of a host URL
which can be obtained by:
1. Navigating to the specific Cloud Run instance in the GCP Console.
2. Obtaining the URL from the product owner.

> When building products, it is good practice to specify these using environmental variables. This will be covered in
> the following section.

```go
package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"log"
	"strings"

	"google.golang.org/api/idtoken"
	"google.golang.org/api/option"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/credentials"
	"google.golang.org/grpc/credentials/oauth"
	"google.golang.org/grpc/status"

	pb "go.protobuf.foo.alis.exchange/foo/br/resources/books/v1"
)

// client is a global client, initialized once per instance.
var (
	booksClient pb.BooksServiceClient
)

func init() {

	// Pre-declare err to avoid shadowing.
	var err error

	// Declare the server host url and port.
	// This follows the format {{neuronID}}-{{majorVersion}}-{{hash}}-{{region}}.a.run.app:{{port}}
	// Typical predefined values are:
	//  - region: "ew"
	//	- port: "443"
	serverHost := "resources-books-v1-z5x5ywf7za-ew-443.a.run.app"

	// Initialise connection to the books service.
	conn, err := NewConn(context.Background(), serverHost, false)
	if err != nil {
		log.Fatal(err)
	}

	// Initialise the client.
	booksClient = pb.NewBooksServiceClient(conn)
}

func main() {}

type grpcTokenSource struct {
	oauth.TokenSource
}

// Code generated by alis.exchange CLI. DO NOT EDIT.
//
// NewConn creates a new gRPC connection.
// host should be of the form domain:port, e.g., example.com:443
func NewConn(ctx context.Context, host string, insecure bool) (*grpc.ClientConn, error) {
	var opts []grpc.DialOption
	if host != "" {
		opts = append(opts, grpc.WithAuthority(host))
	}

	if insecure {
		opts = append(opts, grpc.WithInsecure())
	} else {
		systemRoots, err := x509.SystemCertPool()
		if err != nil {
			return nil, err
		}
		cred := credentials.NewTLS(&tls.Config{
			RootCAs: systemRoots,
		})
		opts = append(opts, grpc.WithTransportCredentials(cred))
	}

	// use a tokenSource to automatically inject tokens with each underlying client request
	audience := "https://" + strings.Split(host, ":")[0]
	tokenSource, err := idtoken.NewTokenSource(ctx, audience, option.WithAudiences(audience))
	if err != nil {
		return nil, status.Errorf(
			codes.Unauthenticated,
			"NewTokenSource: %s", err,
		)
	}
	opts = append(opts, grpc.WithPerRPCCredentials(grpcTokenSource{
		TokenSource: oauth.TokenSource{
			tokenSource,
		},
	}))

	return grpc.Dial(host, opts...)
}
```

### Make your request

The `booksClient` provides you all the methods available, with descriptions of the methods and a specification of what
the request and responses are. Most IDEs allow you to explore these by hovering over client and method names, similar to
the example shown below.

Let us make our requests.

#### List books

Firstly we will get a `list` of all the books and print their display names in the console.

```go
package main

import "fmt"

func main() {
	_ = listBooks()
}

func listBooks() error {
	// List available books
	allBooks, err := booksClient.ListBooks(context.Background(), &pb.ListBooksRequest{})
	if err != nil {
		return fmt.Errorf("could not list books: %v", err)
	}

	for _, book := range allBooks.Books {
		fmt.Printf("%s\n", book.DisplayName)
	}

	return nil
}
```

#### Get book

Secondly, we will `get` a specific book and print all of its information in the console.

```go
package main

import "fmt"

func main() {
	_ = getBook("books/c4a2")
}

func getBook(bookName string) error {
	req := pb.GetBookRequest{Name: bookName}

	book, err := booksClient.GetBook(context.Background(), &req)
	if err != nil {
		return fmt.Errorf("could not get book: %v", err)
	}
	fmt.Printf("%s\n", book)

	return nil
}
```


### Using the responses

As seen the example, response type is ALWAYS predictable as it is based on the proto definition of the resource. This
predictability allows you to easily use the response to perform actions or augment the data.


## End 🏁

As simple as it is to programmatically access a product, **alis.exchange** simplifies building new products and allows
for the seamless integration of existing products into anything that you build.

In the following section, we will unpack a few prerequisite **alis.exchange** concepts and then practically go through
the process of building a new product to ground the concepts and empower you to innovate.

> 👟 **Up next:** _[Core concepts and technologies overview](/TechOverview.md)_ 🏗

**Already have a background of the concepts and set up your device?**
> _[Build your first product](/HelloWorldBuild)_ 👷‍

