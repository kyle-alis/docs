# Build your first product 👷‍

> 👉 In this section, you will build your first product on **alis.exchange** to get a feel for how everything you have installed and read comes together. 

A few final things before we get started:
1. 👀 This section assumes you have successfully [configured your device](/DeviceConfiguration.md). If you had any
    troubles, check out our community Q&A for help.
2. This example is still a work in progress and still requires quite a bit of content. If anything obvious is missing
or incorrect, please either post in our Discussions, or submit a pull request with the fixes.
3. The purpose of this is to get you building. The story and everything around it is fictitious
    and very obviously flawed in business logic. We put a story around it for it to flow, please don't try and reason
	out the story.
4. This example attempts to structure content in a way that provides:
    - 🎥 **Context** - the story we are following and what we aim to achieve.
    - 🏃‍♂ **Execution** - the actual things that you will need to do. Each will be given an id `Ex #` that you can
           use to ask questions about on the Discussion forum and will be used for the in-depth explanation in the
        following onboarding section.
    - 🤓 **Breakdown** - a high-level explanation of what you did and what happened in the background.
5. The technical breakdown section will provide a detailed breakdown of everything that you did in this example so
don't worry if you are not fully comprehending what is happening when you execute the steps - all will come together.

Let's go!

## Help Foo grow 10x

### 🎥 Story time

A group of friends decided to start a company called `Foo` after a discovery in their parents' cupboard led to a set of
business ideas. Two of the founders were unpacking a cupboard when they came across an external hard drive that contained
a large number of eBooks their parents purchased in the mid 2000s. Mike, who always seems to come up with an idea of
making money, suggested that they could start some online store with these books and acquire additional books as time
goes on.

Having some experience in software, James suggested that they build out a set of products, each trying to provide a
well-defined value offering and solving specific problems. Having previously built on **alis.exchange**, it was an
obvious decision to register their new-found company, Foo, on the exchange. They decided to start by creating a book
repository product,`BR`, which defines a `book` resource and keeps track of all the books that they have available. This is the product considered in the [make a request to a product guide](/docs/guides/make-your-first-request.md).

At this point in time, they already have an organisation on **alis.exchange** with their core product `br`. They have given
their employees freedom to experiment with products, simply ignore these in the repos.

### 🏃‍♂ Ex 1: Orientate yourself

Since the organisation and product already exists, you will need to `get` these on your device.

1. From your terminal, run `alis org get foo`.

    > 🤓 This adds the `foo` directory into the `alis.exchange` folder in your `HOME` directory. You can open this to
    > see the various directories that become available. Check out the explanation of how the [alis.exchange folder hierarchy is set up](/docs/references/local-folder-structure.md) to understand what the purpose of each directory is.
   
2. Open the `/proto` directory in your IDE.
3. Navigate to `proto/foo/br/resources/books/v1/` to see the definition of the `book` resource and all the methods
	available for the API.

### 🎥 The design requirements

The founders at `Foo` have decided to create a new Administrative product, `ad`, that coordinates the loans of books by various users.

The product has already been created on **alis.exchange** and simply requires you to build it out. If you are interested in the process around how a product is created, open the section below.

:::details 🤓 `ad` product creation on **alis.exchange**

The process of creating a product is facilitated through the **alis.exchange** CLI. The following sections breaks down the actions that was followed by `foo` to create a product and a brief overview of what happened in the background.

#### Actions executed

1. In the terminal, the command `alis product create foo.ad` was run. You can run `alis product create -h` 
2. The prompts were followed that required the user to specify:
    - Display name for the product
    - Owner of the product
    - Product description
    - Billing account for the product
3. To initialise the product repo, a simple `.gitignore` file was commited and pushed.

Simple right? In the background, a lot of heavy lifting was done. The following section provides an overview thereof.

#### 🤓 Overview of background processes

While the CLI was displaying a spinner:

- A Google Cloud project that hosts the product was created within the foo organisation.
- An empty Google Cloud Source Repository was created for the `ad` product.
- Various permissions was added for the specified owner of the product in order to control access for clients and developers.
- Various Terraform template files was added within `$HOME/alis.exchange/foo/proto/foo/ad` that are used to manage the cloud infrastructure of your product. These Terraform files collectively specifies all the cloud infrastructure that needs to be configured for your product to work, such as enabling various APIs (Cloud Run, Firestore, etc.) and creating permission groups.
:::


 In order to coordinate the loans of books by various users, they firstly require a `receipt` resource.

The use case is as follows: when a client takes out one or more books, a receipt is created that keeps track of various
information such as who client is, which books were borrowed, the date the books were borrowed and the required return date.

Knowing that people often forget when books are due for return, they also require a `notification` service which sends
a reminder to clients about the books required for return, at the specified date.

As part of this example, we will be a `receipt` resource neuron within a new product along with and a `notification` service.
neuron.

:::details 🤓 What is a neuron?
A neuron is a collection of one or more APIs that performs a well defined function, such as interacting with a resource, executing a service or handling an event, by leveraging a collection of cloud resources.

In the case of our `receipt` neuron, the neuron will be providing an API to perform actions (create, update, get) on a `receipt` resource by leveraging cloud resources including Google Cloud Run, Firestore and IAM.

<!-- Find out more by reading the article.... -->
:::

### 🏃‍♂ Create resource neuron

#### 🏃‍♂ Ex 2: Create resource neuron using terminal

Creating a neuron requires the specification of a resource ID, which follows the convention:
    - `resources-{resourceName}-{majorVersion} for resources
    - `services-{serviceName}-{majorVersion} for services

In our example, we would usually have specified the `receipts` resource as `resources-receipts-v1`. However, since we are reusing this product as a playground for multiple users, we ask that you add a unique ending to the resource, such as adding your initials. Eg. `resources-receiptsrs-v1`.

1. From your terminal, run the command `alis neuron create foo.ad.{{yourResourceID}}`, specifying your unique resource ID.

> 🤓 In the background, the CLI created neuron directories with various template files. These will make more sense as we start using them but to know at this stage:<br>
> - Inside the `$HOME/alis.exchange/foo/proto/foo/ad/resources/{resourceName}/v1` directory, a `service.proto` and various Terraform (`*.tf`) files were added;
> - Inside the `$HOME/alis.exchange/foo/products/ad/resources/{resourceName}/v1` directory, various Go (`*.go`) template files were added that will be used for implementing the code as well as a Dockerfile that is used to containerize your source code.

#### 🏃‍♂ Ex 3: Define the resource and methods

<!-- TODO: Add link for understanding proto file -->
> 🤓 A high-level understanding of the proto file structure and the comments on the various aspects of the file content
> should be sufficient to orientate you around the following steps.

‼️ The full proto used in this example can be [found in the repo](/docs//guides//build-your-first-product/src/receipts/receipts.proto). Be careful when copying over content that you **DO NOT** change the `package` name (yours should be `package foo.ad.resources.{yourResourceName}.v1;`) or the `option go_package` specification (yours should be `option go_package = "go.protobuf.foo.alis.exchange/foo/ad/resources/{yourResourceName}/v1";`)

The following steps will run through some important aspects of the proto.

1. Ensure that the following _imports_ are included at the top of the proto:
    ```protobuf
    import "google/protobuf/empty.proto";
    import "google/api/resource.proto";
    import "google/api/field_behavior.proto";
    import "google/api/client.proto";
    import "google/api/annotations.proto";
    import "google/protobuf/timestamp.proto";
    import "google/protobuf/field_mask.proto";
    import "google/type/date.proto";
    ```

    > 🚩 If your IDE cannot find the imports, ensure that you:
    > - Have run `alis org get google`; and
    > - [Configured your plugins correctly](/DeviceConfiguration.md).

2. In `receipts.proto`, define the `Receipt` resource:
    ```protobuf
    //A receipt resource
    message Receipt {

        //Name of the resource in the format:
        //receipts/{receipt}
        string name = 1 [(google.api.field_behavior) = OUTPUT_ONLY];

        //The email of the client.
        //Example: bar@foo.com
        string client = 2 [(google.api.field_behavior) = REQUIRED];

        //The full names of the books taken out by the client.
        //Format: books/{book}
        repeated string books = 3 [(google.api.field_behavior) = REQUIRED];

        //The date the book was borrowed by the client.
        google.type.Date borrow_date = 4 [(google.api.field_behavior) = OUTPUT_ONLY];

        // The date the book(s) is required to be returned
        google.type.Date required_return_date = 5 [(google.api.field_behavior) = REQUIRED];

        // The date the book(s) was actually returned
        google.type.Date actual_return_date = 6;
    }
    ```

3. Now that we have defined the resource, we will add the <a href="https://google.aip.dev/131" target="_blank">
    standard methods</a> on the resource.
    > 🤓 <a href="https://google.aip.dev/131" target="_blank"> The AIP documentation on the standard methods</a> provide
   > an in-depth explanation of the best practices. <br />
   > 🚩 Note that we will only be implementing the `create` and `get` methods in this example.

    Replace the `service Service{...}` section with the following:

    ```protobuf
    ////  The receipt service
   //
   // The idea behind the service is that when a client takes out one
   // or more books, a receipt is created that keeps track of
   // various information.
    service ReceiptsService {
        // Create a new receipt
           // See: https://google.aip.dev/133
        rpc CreateReceipt (CreateReceiptRequest) returns (Receipt) {
            option (google.api.http) = {
                post: "/resources/receipts/v2/receipts"
                body: "receipt"
            };
            option (google.api.method_signature) = "receipt";
        }
        // Get an receipt
           // See: https://google.aip.dev/131
        rpc GetReceipt (GetReceiptRequest) returns (Receipt) {
            option (google.api.http) = {
                get: "/resources/receipts/v2/{name=receipts/*}"
            };
            option (google.api.method_signature) = "name";
        }
        // Update an receipt
           // See: https://google.aip.dev/131
        rpc UpdateReceipt (UpdateReceiptRequest) returns (Receipt) {
            option (google.api.http) = {
                get: "/resources/receipts/v2/{name=receipts/*}"
            };
            option (google.api.method_signature) = "name";
        }
    }
    ```

4. Define the `Request` messages:

    ```protobuf
    // Request message for CreateReceipt.
    message CreateReceiptRequest {
        // The Receipt to create
        Receipt receipt = 1 [(google.api.field_behavior) = REQUIRED];
    }

    // Request message for GetReceipt
    message GetReceiptRequest {
        // The receipt name is the unique identifier across organisations.
        // Format: receipts/{receipt}
        string name = 1 [(google.api.field_behavior) = REQUIRED];
    }
    ```

#### 🏃‍♂ Ex 4: Define the Cloud Infrastructure requirements

Terraform is used to specify the infrastructure required for your neuron. **alis.exchange** provides various `*.tf` file templates that are preconfigured for the majority of use cases. This includes the specifications of:

- Cloud Run: Which is used to run the container of your neuron. The configuration includes the scaling specifications, naming of the instance, traffic and which container to run. 
- Identity and Access Managament (IAM): Which is used to restrict access to the neuron
- Variables: Various environmental variables that are used to facilitate multiple deployment environments and dependencies on other products.

> 💡 **Tip:** Scan through the `*.tf` files along with the [Terraform Documentation](https://www.terraform.io/intro) and the [Google documentation on Terraform Registry](https://registry.terraform.io/providers/hashicorp/google/latest/docs) to understand what is being configured.

When building your own neurons, you may bulk up your neurons with additional functionality by simply adding the Terraform specification for what you are trying to achieve. Examples may be adding:

- A [Cloud Spanner Instance](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/spanner_instance);
- [Defining a Workflow](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/workflows_workflow); and
- [Creating](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/pubsub_topic) or [subscribing](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/pubsub_subscription) to a PubSub topic.

#### 🏃‍♂ Ex 5: Compile the proto files locally

 > 🤓 In order to implement the gRPC server, or programmatically use the API, the `.proto` files are compiled into files containing the service and message definitions for a specified language. In this example, we will be focussing on the implementation in Go.

 In your terminal, run the following command, specifying your neuron name:
 ```bash
 $ alis neuron genprotobuf foo.ad.resources-{uniqueNeuronName}-v1
 ```

 This commands generates `.pb.go` files locally in the `$HOME/alis.exchange/foo/protobuf/go/*` directory, following the path of the Neuron. The contents of these files are not necessary to understand, other than knowing that they contain the definitions for the Go language.

 > 🤓 Once we have finished implementing our API we will push these files to make them available for others to use.

<!-- TODO: This will be updated if we can get the CLI alis neuron gen commands flying -->
 #### 🏃‍♂ Ex 6: Update dependencies required to implement the services
When you ran `alis neuron create ...` command, various template files were also added to the `ad` product directory. These will make sense as we implement the server.

1. To find the definitions for your service, it is required to import the definitions which are specified with the `go.mod` file. These imports, similar to other go packages, are pulled from an online environment. Since we are still building out the services, and have not yet pushed these definitions to an online environment (this will be done in step _______), we will use a `replace` statement to point to the locally compiled files from the previous step.

In your `go.mod`, uncomment the line similar to the one below:
```
replace go.protobuf.ad.foo.alis.exchange with ../../../protobuf/foo/ad
```
2. Ensure that your terminal is open in the `v1` directory containing the `go.mod` file and run the command `go mod tidy` to sync the dependencies.

#### 🏃‍♂ Ex 7: Implement the services

> 🤓 In the `server.go` file, we establish client connections with Google and other **alis.exchange** products during initialisation (`init()`) to make them accessible during run time. In the `main()` section, we create and serve a gRPC server which implements the methods (done in `methods.go`) which were defined in the proto and was translated into the `.pb.go` files.

1. **Establishing client connection during `init()`** 

The init section contains various boilerplate code, of which we can remove that which is not necessary, and add further connections. We want to create a connection with Firestore, which will store the details of our `receipts`, as well as to the `foo.br` product in order to get various book defintions.

Ensure that the section above your `main.go` looks exactly like code below:

```go
package main

import (
	"cloud.google.com/go/firestore"
	"context"
	"google.golang.org/grpc"
	"log"
	"net"
	"os"

	pb "go.protobuf.foo.alis.exchange/foo/br/resources/books/v1"
)

// client is a global client, initialized once per cloud run instance.
var (
	bigtableClient    *bigtable.Client
	booksClient       pbBooks.BooksServiceClient
	eventsClient      pbEvents.ServiceClient
)

func init() {

	// Pre-declare err to avoid shadowing.
	var err error

	// Disable log prefixes such as the default timestamp.
	// Prefix text prevents the message from being parsed as JSON.
	// A timestamp is added when shipping logs to Cloud Logging.
	log.SetFlags(0)

	// Retrieve project id from the environment.
	projectID := os.Getenv("ALIS_OS_PROJECT")
	if projectID == "" {
		log.Fatal("ALIS_OS_PROJECT env not set.")
	}

	// Initialise Firestore client
	firestoreClient, err = firestore.NewClient(context.Background(), projectID)
	if err != nil {
		log.Fatalf("firestore.NewClient: %v", err)
	}

    // Retrieve BR cloud run hash from the environment.
	brHash := os.Getenv("ALIS_OS_BR_CLOUDRUNHASH")
	if brHash == "" {
		log.Fatal("ALIS_OS_PROJECT env not set.")
	}

    // Create a connection with the gRPC server hosted on Cloud Run
    // The URI of these services follows a consistent pattern:
    // {NeuronName}-{GoogleProjectCloudRunHash}-{region}.a.run.app:443
    // 
    // The {GoogleProjectCloudRunHash} is not preemptable but is the same for all neurons
    // of a specific product deployment, ie. the same for all Cloud Run services in a Google Project.
    // This therefore requires you to obtain the hash from the product that you are making use of.
    //
    // The {region} is the region in which the service is hosted. The default region
    // on alis.exchange is `ew`, ie. Europe-West. For more information on regions,
    // see: __________.
    if conn, err := NewConn(context.Background(), "resources-books-v1-" + brHash + "-ew.a.run.app:443", false); err != nil {
        log.Fatalf("booksClient new connection: %v", err)
	} else {
        // If the connection was succesfully established, instantiate a new
        // client for the BooksService. This client will be used to make the
        // appropriate calls to the BooksService methods.
		booksClient = pb.NewBooksServiceClient(conn)
	}
}
```

> 🚩 If your IDE is giving any import errors, rerun `go mod tidy`.

2. **Configure your environmental variables**

In the above code, there are two usages of `os.Getenv(...)`. This is used to obtain environmental variables, which simplifies having multiple deployment environments by allowing us to declare these variables on deployment. 

<!-- TODO: add more detail/write an article about ENVs, their usage and utility -->

For the production environment, we will specify these when deploying. For the local environment, we make use of the `local.env` file in the product (`ad`) directory. To ensure that your IDE is able to find the values in the `local.env`, ensure that you have [installed and configured the correct plugins]().

The `local.env` should contain the following content:

```yaml
# this file is used for local development purposes only
# and should be used in conjunction with your IDE.

# Specifies the type of environment: 'development' or 'production'
#
# In the production environment this is automatically added to 
# The Cloud Run service through the specification in the `cloudrun.tf`
ALIS_OS_ENV=development

# The Google Project ID where the neuron will be hosted. This
# is a product deployment and therefore requires a product deployment
# to exist before it can be declared.
#
# This can be found be running `alis product tree foo.ad` and selecting
# a deployment ID. We typically use a dev environment for local development
# and testing.
ALIS_OS_PROJECT=foo-ad-dev-....

# The Cloud Run hash of the br product deployment
# that we have access to.
#
# For your own products, you can find this hash by opening
# a Cloud Run instance and checking the URL.
ALIS_OS_BR_CLOUDRUNHASH=radxpo5gpa
```
<!-- TODO: NB make sure we can't generate service account keys in the Foo org using the CLI -->

3. **Implement the gRPC server** 

The `main()` section in your `server.go` contains all of the boilerplate code you require to simply run the server. Check that your `main()` contains the exact following: 

```go
func main() {
	log.Println(&Entry{Message: "starting server...", Severity: LogSeverity_NOTICE})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Println(&Entry{Message: "Defaulting to port " + port, Severity: LogSeverity_WARNING})
	}

	listener, err := net.Listen("tcp", ":"+port)
	if err != nil {
		log.Fatalf("net.Listen: %v", err)
	}

	grpcServer := grpc.NewServer(grpc.UnaryInterceptor(serverInterceptor))
	pb.RegisterServiceServer(grpcServer, &myService{})

	if err = grpcServer.Serve(listener); err != nil {
		log.Fatal(err)
	}
}
```

4. Copy over the tests in `methods_test.go`. Writing the tests first allow us to think about what our expected API behaviour should be before implementing

5. Implement the methods in `methods.go`. Copy over the code...

> 🤓 The code itself provides the detailed logic about what happens but the typical body of a method will include
> 1. Some validation of the arguments
> 2. Some interaction with APIs
> 3. Parsing if required
> 4. Performing actions with APIs
> 5. Response

6. Run the tests

If all of the tests have passed, we are ready build and deploy our neuron.