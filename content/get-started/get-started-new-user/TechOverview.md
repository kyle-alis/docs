# Core concepts and technologies overview 🏗

> 👉 Often times, terminology becomes an unnecessary barrier to exploring new things. <br />
> We want to teach you to talk our talk.
> In this section, we aim to provide you with an overview of the most important concepts and technologies  **alis.exchange**
> for you to get building.

The technologies referred to in this section of the onboarding can be overwhelming if attempting to understand everything.
The content we provide is an attempt at synthesising the knowledge required to get going on **alis.exchange**. For each
of the topics, we have included a set of resources that can be used for reference or deeper learning at a future point.

If there are any resources that you believe would be helpful to add, please fork this repo and make a pull request.

## Resource-oriented design
One of the biggest challenges faced within and across organisations is standards in terms of communication. Adopting a
resource-oriented design paradigm as a core part of **alis.exchange** has helped to establish a consistent standard of
communication across everything that happens on the exchange.

### Important resources

Google has two detailed resources that should be read to get a baseline understanding of this paradigm.<br />
🚩 _The takeaway at this stage should be the concepts and not the technical details around it._

- <a href="https://cloud.google.com/apis/design/resources" target="_blank">Resource-oriented design</a>
- <a href="https://google.aip.dev/121" target="_blank">AIP-121: Resource-oriented design</a>

The latter resource is part of Google's API Improvement Proposal, which is _"a design document providing high-level,
concise documentation for API development"_. These AIPs provide clear guidelines how to go about the design of resources
on **alis.exchange** and may be of use to spend some time in once you start building. Additionally, we have built IDE plugins
for these AIPs to help enforce best practices while you design.

[//]: # (### Additional resources)

## Protocol buffers

Resource-oriented design is established on **alis.exchange** by the usage of protocol buffers, commonly referred to as
_protos_, as the interface definition language. This technology is core to how **alis.exchange** solve the various
problems described in the onboarding introduction.

> _"Protocol buffers are Google's language-neutral, platform-neutral, extensible mechanism for serializing structured
> data... You define how you want your data to be structured once, then you can use special generated source code to
> easily write and read your structured data to and from a variety of data streams and using a variety of languages."_ -
> <a href="https://developers.google.com/protocol-buffers" target="_blank">Source</a>

The protos becomes the golden source of truth of anything we do on the exchange. Having this, one can eliminate
common developer toil by:
- Auto-generating documentation for APIs;
- Auto-generating source code for the majority of popular languages including Go, Java, Python and more;
- Auto-generating equivalent REST endpoints for gRPC services;
- Setting API behaviour; and
- Permissioning on a service level.

Additionally, having a clear structure that enforces standards of naming and defining everything you build, and
use to build, overcomes several organisational friction points in communicating what it is that anyone is busy with
at any point in time.

### Additional resources

- <a href="https://www.youtube.com/watch?v=ZEw9YryQotE" target="_blank">How is Protocol Buffer used?</a>
- <a href="https://developers.google.com/protocol-buffers">Protocol buffers documentation</a>

## Terraform

> _"Terraform is an open-source infrastructure as code (IaC) software tool that provides a consistent CLI workflow to manage
> hundreds of cloud services. Terraform codifies cloud APIs into declarative configuration files."_ -
> <a href="https://www.terraform.io/#:~:text=Terraform%20is%20an%20open%2Dsource%20infrastructure%20as%20code%20software%20tool%20that%20provides%20a%20consistent%20CLI%20workflow%20to%20manage%20hundreds%20of%20cloud%20services.%20Terraform%20codifies%20cloud%20APIs%20into%20declarative%20configuration%C2%A0files.">Source</a>


Terraform is mandatory for usage on **alis.exchange** and allows for all the infrastructure required to be specified
as code. This provides many benefits, such as:
- Configuration consistency for different service deployments.
- Centralising all definition and specifications by having the IaC along with the resource and service definitions in
    an organisation's proto directory.
- Ease of communication around how products and services are configured
- Reproducibility

### Additional resources


- <a href="https://www.youtube.com/watch?v=tomUWcQ0P3k" target="_blank">Terraform in 100 Seconds</a>
- <a href="https://www.youtube.com/watch?v=HmxkYNv1ksg" target="_blank">Terraform Explained</a>

## gRPC

gRPC is the primary inter-process communication protocol used on **alis.exchange** and is widely adopted by large companies
such as <a href="https://grpc.io/about/#whos-using-grpc-and-why" target="_blank">Google, Netflix and Square</a>.
The following extracts are taken from the <a href="https://www.amazon.com/gRPC-Running-Building-Applications-Kubernetes/dp/1492058335" target="_blank">gRPC: Up & Running</a> book
(pages 10-13) to provide an overview of the technology.

> Modern software applications rarely operate in isolation. Rather, they are connected with each other through computer
> networks and communicate and coordinate their actions by passing messages to one another. Therefore, a modern software
> system is a collection of distributed software applications that are running at different network locations and
> communicate with each other with message passing using different communication protocols.
>
> Inter-process communications are usually implemented using message passing with a synchronous request-response style
> or asynchronous event-driven styles.
>
> When it comes to building synchronous request-response style communication for modern cloud native applications and
> microservices, the most common and conventional approach is to build them as RESTful services, where you model your
> application or service as a collection of resources that can be accessed and have their state changed via network
> calls that take place over the HTTP protocol. However, for most use cases RESTful services are quite bulky,
> inefficient, and error-prone for building inter-process communication. It is often required to have a highly
> scalable, loosely coupled inter-process communication technology that is more efficient than RESTful services.
> This is where gRPC, a modern inter-process communication style for building distributed applications and
> microservices, comes into the picture (we’ll compare and contrast gRPC with RESTful communication later in this
> chapter). gRPC primarily uses a synchronous request-response style for communication but can operate in fully
> asynchronous or streaming mode once the initial communication is established.
>
> gRPC (the “g” stands for something different in every gRPC release) is an inter-process communication technology that
> allows you to connect, invoke, operate, and debug distributed heterogeneous applications as easily as making a local
> function call.
>
> When you develop a gRPC application the first thing that you do is define a service interface. The service interface
> definition contains information on how your service can be consumed by consumers, what methods you allow the consumers
> to call remotely, what method parameters and message formats to use when invoking those methods, and so on.
> The language that we specify in the service definition is known as an interface definition language (IDL). Using that
> service definition, you can generate the server-side code known as a server skeleton, which simplifies the server-side
> logic by providing low-level communication abstractions. Also, you can generate the client-side code, known as a
> client stub, which simplifies the client-side communication with abstractions to hide low-level communication for
> different programming languages. The methods that you specify in the service interface definition can be remotely
> invoked by the client side as easily as making a local function invocation. The underlying gRPC framework handles all
> the complexities that are normally associated with enforcing strict service contracts, data serialization,
> network communication, authentication, access control, observability, and so on.

It is recommended that you read the documentation on the <a href="https://grpc.io/docs/what-is-grpc/core-concepts/" target="_blank">
key gRPC concepts, with an overview of gRPC architecture and RPC life cycle</a>. Again, the focus is to get used to the
concepts at this stage, do not worry about the detail.

## Git

If you are not familiar with Git, you can check out the <a href="https://www.youtube.com/watch?v=hwP7WQkmECE" target="_blank">
_Git Explained in 100 Seconds_ video by Fireship </a>.

On **alis.exchange**, we use Git as the version control system and integrate with it to control builds of your products
and neurons. We are pattern agnostic, so whether you use a _feature branch_ workflow, _trunk-based development_ or any
other pattern, you will be able to develop on **alis.exchange** as long as Git is used.

## Google Cloud Platform

🔜 Synthesis of GCP coming soon. If you have not yet had any experience with GCP, you can check out the
<a href="https://www.youtube.com/watch?v=4D3X6Xl5c_Y" target="_blank">_Essentials of GCP_</a> video.

The majority of what makes up **alis.exchange** is run on GCP - this includes both **alis.exchange**'s infrastructure
and the products that organisations have built on **alis.exchange**

### Additional resources

- <a href="https://cloud.google.com/docs" target="_blank">Google Cloud documentation</a>

## Go

Go allows us to _"build fast, reliable, and efficient software at scale"_.
> - Go is an open source programming language supported by Google
> - Easy to learn and get started with
> - Built-in concurrency and a robust standard library
> - Growing ecosystem of partners, communities, and tools
> <br /> <a href="https://go.dev/" target="_blank">Source</a>


<a href="https://go.dev/tour/welcome/1" target="_blank">A Tour of Go</a> provides a helpful, hands-on overview of Go that may be good to work through if you are not experienced
in Go.

### Additional resources

- <a href="https://acloudguru.com/blog/engineering/what-is-go-an-intro-to-googles-go-programming-language-aka-golang" target="_blank">What is Go? An intro to Google’s Go programming language</a>
- <a href="https://www.gopl.io/" target="_blank">The Go Programming Language</a> book
- <a href="https://go.dev/doc/" target="_blank">Go Documentation</a>


## End 🏁

Now that you have some idea of what is used under the hood, we will help you configure your device to get building.

> 👟 **Up next:** _[Configuring your device](/DeviceConfiguration.md)_ 🧑‍💻

**Already have a background of the concepts and set up your device?**
> _[Build your first product](/HelloWorldBuild)_ 👷‍