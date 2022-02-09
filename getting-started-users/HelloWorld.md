# Build your first product 👷‍

> 👉 Now for the exciting part - actually getting to the code. In this section, you will build your first product on
> **alis.exchange** to get a feel for how everything you have installed and read comes together.

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
    - 🤓 **Breakdown** - an explanation on what you did and what happened in the background.
5. The following onboarding section will provide a detailed breakdown of everything that you did in this example so
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
repository product,`BR`, which defines a `book` resource and keeps track of all the books that they have available.

At this point in time, they already have an organisation of the exchange with their core product `br`. They have given
their employees freedom to experiment with products, simply ignore these in the repos.

Foo has approached you to help build out a library-like product that allows users to have online access to a book for
a period of time.

### 🏃‍♂ Ex 1: Orientate yourself

Since the organisation and product already exists, you will need to `get` these on your device.

1. From your terminal, run `alis org get foo`.

   [//]: # ( TODO: This should be a link to the documentation of the CLI that speaks about folder structure. )
    > 🤓 This adds the `foo` directory into the `alis.exchange` folder in your `HOME` directory. You can open this to
   > see the various directories that become available: <br />
   > `/api` [_Currently unused_] <br />
   > `/product` [_This will only be created once you `get` or `create` a product_] - This contains multiple directories,
   > one for each `product`. These individual `product` directories is a git repo where the source code for a `product`
   > lives. <br />
   > `/proto` - This directory contains all the product definitions, both the `*.proto` files - which contain the service
   >  definitions - and the various `*.tf` files - which define the infrastructure requirements at both a `product` and
   > `neuron` level. A git repo sits at this level.<br />
   > `/protobuf` - Contains the _server skeleton_ which and _client stub_ for the protos in the various languages
   > available. The _server skeleton_ is used for the implementation of the <a href="https://grpc.io/docs/what-is-grpc/core-concepts/#:~:text=On%20the%20server%20side%2C%20the%20server%20implements%20the%20methods%20declared%20by%20the%20service%20and%20runs%20a%20gRPC%20server%20to%20handle%20client%20calls.%20The%20gRPC%20infrastructure%20decodes%20incoming%20requests%2C%20executes%20service%20methods%2C%20and%20encodes%20service%20responses." target="_blank">
   > server</a>. The _client stub_ is used on the <a href="https://grpc.io/docs/what-is-grpc/core-concepts/#:~:text=On%20the%20client%20side%2C%20the,server%E2%80%99s%20protocol%20buffer%20response(s)." target="_blank">
   > client side</a> to programmatically call the APIs.<br />

2. Open the `/proto` directory in your IDE.
3. Navigate to `proto/foo/br/resources/books/v1/` to see the definition of the `book` resource and all the methods
	available for the API.

### 🎥 The design requirements

The founders at `Foo` have decided to create a new Administrative product that coordinates the loans of books by various
users. To do this, they firstly require a `receipt` resource.

The use case is as follows: when a client takes out one or more books, a receipt is created that keeps track of various
information such as the client, the books borrowed, the borrow and return date.

Knowing that people often forget when books are due for return, they also require a `notification` service which sends
a reminder to clients about the books required for return, at the specified date.

As part of this example, we will be creating a new product with a `receipt` resource neuron and a `notification` service
neuron.

### 🤓 Workflow

The workflow that will be followed to build the product follows the diagram set out below. Each of the steps will be
unpacked in the following sections.

![](img/HelloWorldWorkflow.svg)

### 🏃‍♂ Ex 2: Create product

We will create a new product that requires a unique ID. For this example, select two random letters such as the first
two letters of your name. If these already exist, simply choose something else.

1. From your terminal, run the command `alis product create foo.{id}` where {id} is the unique ID you have selected.
    > 🤓 This command adds an `{id}` folder in the foo organisation `proto` directory as well as in the `product`
   > directory. If your ID was `aa` then this folder would be named `aa`.
2. Add a `.gitignore` file to the product and commit.
3. The CLI configures the basic .tf files that we will need to get started. Check it out --> commit.

### 🏃‍♂ Ex 3: Build and deploy the product

> 🤓 As explained in (), requires that you create a deployment. In the background, the process described in the
> documentation is executed.

From your terminal, run the following commands:
1. `alis product build foo.{id}`
2. Once the former has completed, `alis product deploy foo.{id}`.
    - Since no previous deployments exist, you will need to create a new deployment. Follow the prompts to create a new
		`development` deployment name with a display name of your preference.

Now that things exist, can start building your neurons.

### 🏃‍♂ Create resource neuron

#### 🏃‍♂ Ex 4: Create resource neuron using terminal

1. From your terminal, run the command `alis neuron create foo.{id}.resources-receipts-v1`.
2. Rename

#### 🏃‍♂ Ex 5: Define the resource and methods
> 🤓 A high-level understanding of the proto file format and the comments on the various aspects of the file content
> should be sufficient to orientate you around the following steps.
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
> 👟 **Up next:** _[Contributing to the community](/Contributing.md)_ 🖖


