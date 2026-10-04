// CertStack AZ-900 modules 2-12.
// Original teaching content mapped to the current Microsoft Learn objectives.
// No proprietary exam questions are used.

const CERTSTACK_STUDY_GUIDE="https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-900";

function term(label,definition){
  return `<span class="term-chip" tabindex="0">${label}<span class="service-tooltip"><strong>${label}</strong><br>${definition}</span></span>`;
}
function explainTerms(text){
  return text.replace(/\[\[([^|\]]+)\|([^\]]+)\]\]/g,(_,label,definition)=>term(label,definition));
}

const moduleCatalog={
2:{
  world:"WORLD 1 // CLOUD CONCEPTS",
  title:"Benefits of using cloud services",
  source:"https://learn.microsoft.com/en-us/training/modules/describe-benefits-use-cloud-services/",
  quests:[
    {title:"High availability + scalability",headline:"Stay up. Grow when demand grows.",
     body:"[[High availability|Designing a service so it stays accessible when failures happen.]] is about staying reachable. [[Scalability|Changing capacity to match demand.]] is about handling more or less work.",
     points:["HIGH AVAILABILITY — keep the service running when a component fails.","VERTICAL SCALE — give one machine more CPU, memory, or power.","HORIZONTAL SCALE — add more machines or instances to share the work."],
     q:"Your app is healthy, but a sale brings 10× more users. What cloud benefit are you using when you add more instances?",options:["High availability","Scalability"],correct:1,why:"The service is already healthy; the problem is demand. Adding capacity is scalability."},
    {title:"Reliability + predictability",headline:"Recover well. Know what to expect.",
     body:"[[Reliability|A system's ability to recover from failures and continue operating.]] is about resilience. [[Predictability|Being able to estimate expected performance and cost.]] helps planning.",
     points:["RELIABILITY — design so a failure does not become a total outage.","PERFORMANCE PREDICTABILITY — understand how resources behave as demand changes.","COST PREDICTABILITY — estimate, monitor, and control expected spending."],
     q:"A company wants to estimate monthly cloud spend before a launch. Which benefit is most directly involved?",options:["Predictability","Reliability"],correct:0,why:"Estimating expected cost is part of cloud predictability."},
    {title:"Security + governance",headline:"Protect the system and enforce the rules.",
     body:"Cloud platforms provide security controls plus [[governance|The rules, policies, and processes used to keep technology aligned with organizational requirements.]] tools.",
     points:["SECURITY — identity, network, data, and threat-protection controls.","GOVERNANCE — policies and standards can be applied consistently.","Cloud does not remove your security responsibilities; responsibility is shared."],
     q:"You need every new resource to follow an organizational rule automatically. Which benefit is most relevant?",options:["Governance","Scalability"],correct:0,why:"Governance is about applying and enforcing organizational standards."},
    {title:"Manageability",headline:"Control resources without touching the hardware.",
     body:"Cloud resources can be managed through a web portal, command-line tools, APIs, templates, and automation.",
     points:["MANAGEMENT OF THE CLOUD — configure resources, scale them, monitor them, and automate changes.","MANAGEMENT IN THE CLOUD — use cloud tools to administer applications and infrastructure.","Automation reduces repetitive manual work and improves consistency."],
     q:"A team uses a script to create the same cloud setup repeatedly. What benefit is this demonstrating?",options:["Manageability","Private cloud"],correct:0,why:"Automation and repeatable management are manageability benefits."},
    {title:"Sustainability",headline:"Use shared infrastructure more efficiently.",
     body:"Microsoft Learn also introduces sustainability considerations: large shared cloud facilities can operate infrastructure at scale and organizations can avoid maintaining underused hardware.",
     points:["Shared infrastructure can improve utilization compared with idle dedicated equipment.","Cloud providers can optimize datacenter power and cooling at very large scale.","Sustainability depends on workload choices too; cloud use is not automatically impact-free."],
     q:"Which statement is safest?",options:["Cloud has zero environmental impact.","Cloud can improve infrastructure efficiency, but workload choices still matter."],correct:1,why:"Cloud can improve efficiency, but it does not make computing impact-free."}
  ],
  assessment:[
    ["A service must remain reachable if one component fails. Which concept fits best?",["High availability","Scalability","CapEx"],0],
    ["Adding three more instances to handle traffic is which type of scaling?",["Vertical","Horizontal","Predictive"],1],
    ["Using policies and standardized controls across resources is primarily a benefit of:",["Governance","Storage tiers","Public endpoints"],0]
  ]
},
3:{
  world:"WORLD 1 // CLOUD CONCEPTS",title:"Cloud service types",
  source:"https://learn.microsoft.com/en-us/training/modules/describe-cloud-service-types/",
  quests:[
    {title:"Infrastructure as a Service",headline:"Rent the infrastructure. You manage more of the stack.",
     body:"[[IaaS|Infrastructure as a Service: rented compute, storage, and networking where you still manage much of the operating environment.]] is closest to traditional IT without owning the physical hardware.",
     points:["Provider manages the physical datacenter and hosts.","You commonly manage the OS, applications, data, and many configurations.","Best fit when you need high control or are moving existing server workloads."],
     q:"You need a cloud VM but still want to manage the operating system. Which service type?",options:["IaaS","SaaS","PaaS"],correct:0,why:"IaaS gives you virtualized infrastructure while leaving more management to you."},
    {title:"Platform as a Service",headline:"Bring the app. Let the platform handle more underneath.",
     body:"[[PaaS|Platform as a Service: a managed application platform where the provider handles more of the underlying OS and runtime.]] reduces infrastructure work.",
     points:["You focus more on application code and data.","Provider manages more of the OS, runtime, patching, and platform.","Good when developers want to deploy apps without managing servers directly."],
     q:"A developer wants to deploy web code without patching the server OS. Best fit?",options:["PaaS","IaaS"],correct:0,why:"PaaS removes more server-management responsibility."},
    {title:"Software as a Service",headline:"Use the finished application.",
     body:"[[SaaS|Software as a Service: a complete application delivered as a service.]] gives the customer the least infrastructure responsibility.",
     points:["Provider operates the application and underlying platform.","Customer mainly manages users, access, configuration, and their data.","Examples are finished business applications consumed over the internet."],
     q:"Your organization subscribes to a finished email application instead of hosting mail servers. Which model?",options:["SaaS","IaaS","PaaS"],correct:0,why:"You are consuming a complete application, which is SaaS."}
  ],
  assessment:[
    ["Which model gives the customer the most control over the operating system?",["IaaS","PaaS","SaaS"],0],
    ["Which model is best described as 'deploy your code without managing the server OS'?",["PaaS","SaaS","Private cloud"],0],
    ["A completed application delivered over the internet is:",["SaaS","IaaS","CapEx"],0]
  ]
},
4:{
  world:"WORLD 2 // AZURE ARCHITECTURE & SERVICES",title:"Core architectural components",
  source:"https://learn.microsoft.com/en-us/training/modules/describe-core-architectural-components-of-azure/",
  quests:[
    {title:"Datacenters + regions",headline:"The cloud still lives somewhere.",
     body:"Azure runs in physical [[datacenters|Facilities containing servers, networking, storage, power, cooling, and physical security.]]. Datacenters are grouped into [[regions|Geographic areas containing one or more nearby Azure datacenters.]].",
     points:["A region is the location choice you commonly make when creating a resource.","Region choice can affect latency, service availability, compliance, and cost.","Sovereign regions are isolated regions designed for specific government or regulatory needs."],
     q:"When you choose East US for a resource, what are you primarily choosing?",options:["An Azure region","A resource group","A subscription"],correct:0,why:"East US is an Azure region."},
    {title:"Availability Zones",headline:"Separate failure locations inside a region.",
     body:"[[Availability Zones|Physically separate datacenter locations within an Azure region, each with independent power, cooling, and networking.]] help reduce the risk that one datacenter failure takes everything down.",
     points:["Zones exist within supported regions.","They provide physical separation while keeping resources in the same region.","Zone-aware designs can improve availability."],
     q:"You want two copies of a service in physically separate locations inside one region. Use:",options:["Availability Zones","Management Groups"],correct:0,why:"Availability Zones provide physically separate locations within a region."},
    {title:"Resources + resource groups",headline:"Everything you create is a resource. Group related things together.",
     body:"An Azure [[resource|A manageable item in Azure, such as a VM, storage account, or virtual network.]] belongs to a [[resource group|A logical container used to organize related Azure resources.]].",
     points:["A resource belongs to one resource group at a time.","Resource groups help organize lifecycle, permissions, and management.","Deleting a resource group deletes the resources inside it, so grouping matters."],
     q:"VM + storage + network for one app should be organized together in a logical container called:",options:["Resource group","Availability Zone"],correct:0,why:"Resource groups organize related Azure resources."},
    {title:"Subscriptions + management groups",headline:"Build the management hierarchy.",
     body:"A [[subscription|A boundary for billing, quotas, and access management in Azure.]] contains resource groups. [[Management groups|Containers above subscriptions used to apply governance across multiple subscriptions.]] sit higher in the hierarchy.",
     points:["MANAGEMENT GROUP → SUBSCRIPTION → RESOURCE GROUP → RESOURCE.","Subscriptions can separate billing, environments, or organizational boundaries.","Policies and access can be applied high in the hierarchy and inherited below."],
     q:"What sits directly above resource groups in the Azure management hierarchy?",options:["Subscription","Region","Datacenter"],correct:0,why:"Resource groups live inside subscriptions."}
  ],
  assessment:[
    ["Physically separate locations inside one Azure region are:",["Availability Zones","Resource groups","Subscriptions"],0],
    ["Which order is correct from broadest management scope to narrowest?",["Management group → Subscription → Resource group → Resource","Resource → Region → Subscription → Zone"],0],
    ["A VM in Azure is an example of a:",["Resource","Management group","Region pair"],0]
  ]
},
5:{
  world:"WORLD 2 // AZURE ARCHITECTURE & SERVICES",title:"Azure compute services",
  source:"https://learn.microsoft.com/en-us/training/modules/describe-azure-compute-networking-services/",
  quests:[
    {title:"Virtual machines",headline:"A computer you configure, running on Azure hardware.",
     body:"An Azure [[VM|Virtual machine: a software-defined computer running on physical Azure hosts.]] gives you an OS, CPU, memory, disks, and networking without buying the physical server.",
     points:["You choose image/OS, size, disks, and network configuration.","Azure handles the underlying physical host; you manage much of the guest OS and workload.","VM Scale Sets can create and manage groups of similar VMs."],
     q:"You need full OS-level control for a legacy application. Best compute choice?",options:["Virtual machine","Function"],correct:0,why:"VMs provide OS-level control."},
    {title:"VM availability + scale",headline:"One VM is one failure point. Design around it.",
     body:"[[Availability sets|A VM availability feature that spreads VMs across separate fault and update domains.]] and [[VM Scale Sets|A service for deploying and scaling groups of VMs.]] solve different problems.",
     points:["Availability features reduce correlated failures.","Scale Sets add/remove VM instances to match demand.","Availability Zones provide stronger physical separation when supported."],
     q:"You need a group of similar VMs that can grow automatically. Use:",options:["VM Scale Sets","Azure DNS"],correct:0,why:"Scale Sets are built for groups of scalable VMs."},
    {title:"Containers",headline:"Package the app and its dependencies.",
     body:"[[Container|A lightweight package containing an application and the dependencies it needs to run.]] shares the host OS kernel rather than emulating a full computer like a VM.",
     points:["Containers start quickly and are portable.","They are lighter than full VMs for many app workloads.","Azure offers container services for running and orchestrating containers."],
     q:"You want a lightweight portable app package that starts quickly. Which compute type?",options:["Container","Full VM only"],correct:0,why:"That is the core container use case."},
    {title:"Functions + serverless",headline:"Run code when something happens.",
     body:"Azure Functions is a [[serverless|A model where you focus on code while the platform handles server provisioning and much of the scaling.]] compute option.",
     points:["Functions are event-driven.","You do not manage a dedicated server for each function.","Good for short tasks, automation, and event processing."],
     q:"Run a short piece of code whenever a file is uploaded, without managing a server. Best fit?",options:["Azure Functions","Dedicated VM"],correct:0,why:"Functions are event-driven serverless compute."},
    {title:"Application hosting choices",headline:"Pick the amount of control you actually need.",
     body:"Azure offers VMs, containers, Web Apps, and functions. The choice depends on how much infrastructure control versus platform management you want.",
     points:["VM — most OS control.","Container — portable packaged runtime.","Web App/PaaS — managed hosting for web applications.","Function — event-driven serverless code."],
     q:"A normal web app needs managed hosting but not OS control. Which category is the best starting point?",options:["Web App / PaaS","Raw VM"],correct:0,why:"Managed web hosting reduces infrastructure management."}
  ],
  assessment:[
    ["Which option gives the most direct OS control?",["Virtual machine","Function","SaaS"],0],
    ["Which service is designed to scale a group of similar VMs?",["VM Scale Sets","Azure DNS","Blob Storage"],0],
    ["Event-driven code without managing dedicated servers is:",["Serverless functions","Availability Zones","ExpressRoute"],0]
  ]
},
6:{
  world:"WORLD 2 // AZURE ARCHITECTURE & SERVICES",title:"Azure networking services",
  source:"https://learn.microsoft.com/en-us/training/modules/describe-azure-networking-services/",
  quests:[
    {title:"Virtual networks + subnets",headline:"Give cloud resources a network to live in.",
     body:"An Azure [[VNet|Virtual Network: a private logical network in Azure.]] lets resources communicate. A [[subnet|A smaller network segment inside a virtual network.]] divides that address space into sections.",
     points:["VNets define private network space.","Subnets organize and isolate groups of resources.","Network access controls determine what traffic is allowed."],
     q:"You want to divide one Azure virtual network into smaller network sections. Use:",options:["Subnets","Subscriptions"],correct:0,why:"Subnets segment a virtual network."},
    {title:"Peering + endpoints",headline:"Connect networks and control where services are reached.",
     body:"[[VNet peering|A direct private connection between Azure virtual networks.]] links VNets. A [[public endpoint|A service address reachable through public networking.]] differs from a [[private endpoint|A private IP-based connection to a service inside a VNet.]].",
     points:["Peering connects VNets privately.","Public endpoints are reachable through public network paths when allowed.","Private endpoints bring service access into private network space."],
     q:"You want a storage service reachable through a private IP in your VNet. Use:",options:["Private endpoint","Public endpoint"],correct:0,why:"A private endpoint gives the service a private network path."},
    {title:"VPN Gateway + ExpressRoute",headline:"Connect Azure to your existing network.",
     body:"[[VPN Gateway|Azure service that creates encrypted connections over the public internet.]] and [[ExpressRoute|Private dedicated connectivity between on-premises networks and Microsoft cloud services.]] connect environments in different ways.",
     points:["VPN uses encrypted tunnels across the internet.","ExpressRoute uses a private provider connection and does not traverse the public internet in the same way.","Choice depends on requirements for connectivity, cost, bandwidth, and architecture."],
     q:"You need private dedicated connectivity from your datacenter to Azure rather than an internet VPN. Use:",options:["ExpressRoute","VPN Gateway"],correct:0,why:"ExpressRoute provides private dedicated connectivity."},
    {title:"Azure DNS + network controls",headline:"Names have to resolve, and traffic has to be controlled.",
     body:"[[DNS|Domain Name System: translates names into network addresses.]] helps clients find services. Azure networking also uses controls such as network security rules to limit traffic.",
     points:["Azure DNS can host DNS domains and records.","Name resolution lets users and systems use names instead of memorizing IP addresses.","Network controls restrict which sources, destinations, ports, and protocols are allowed."],
     q:"What technology translates a name like app.example.com into an IP address?",options:["DNS","RBAC"],correct:0,why:"DNS resolves names to network addresses."}
  ],
  assessment:[
    ["A private logical network in Azure is a:",["VNet","Resource group","Storage tier"],0],
    ["Dedicated private connectivity from on-premises to Azure is:",["ExpressRoute","Azure DNS","MFA"],0],
    ["A private IP connection to an Azure service is a:",["Private endpoint","Public endpoint","Tag"],0]
  ]
},
7:{
  world:"WORLD 2 // AZURE ARCHITECTURE & SERVICES",title:"Azure storage services",
  source:"https://learn.microsoft.com/en-us/training/modules/describe-azure-storage-services/",
  quests:[
    {title:"Storage accounts + services",headline:"One account can expose different kinds of storage.",
     body:"An Azure [[storage account|A top-level Azure resource that provides a namespace and configuration boundary for Azure Storage services.]] can provide services such as Blob, Files, Queues, and Tables.",
     points:["Blob — object storage for files and unstructured data.","Files — managed file shares.","Queues — messages between application components.","Tables — NoSQL key/attribute data."],
     q:"You need object storage for images and backups. Which service?",options:["Blob Storage","Azure Files only","Azure DNS"],correct:0,why:"Blob Storage is Azure object storage."},
    {title:"Storage tiers",headline:"Pay differently based on how often data is used.",
     body:"Storage tiers trade access frequency, storage price, and retrieval cost.",
     points:["HOT — frequent access.","COOL/COLD — less frequent access, lower storage cost with trade-offs.","ARCHIVE — long-term rarely accessed data with slower retrieval."],
     q:"Data is kept for years and almost never read. Which tier is designed for this pattern?",options:["Archive","Hot"],correct:0,why:"Archive is intended for rarely accessed long-term data."},
    {title:"Redundancy",headline:"How many copies, and how far apart?",
     body:"Azure storage [[redundancy|Keeping multiple copies of data to reduce the risk of loss or outage.]] options differ by where copies are stored.",
     points:["Locally redundant — copies within one datacenter location.","Zone-redundant — copies across availability zones in a region.","Geo-redundant options replicate to a secondary region."],
     q:"You want copies across separate Availability Zones in one region. Choose:",options:["Zone-redundant storage","Local-only redundancy"],correct:0,why:"Zone-redundant storage spreads copies across zones."},
    {title:"Moving files",headline:"Choose the tool based on the job.",
     body:"Microsoft Learn highlights [[AzCopy|A command-line utility for copying data to and from Azure Storage.]], [[Storage Explorer|A graphical desktop tool for working with Azure Storage.]], and [[Azure File Sync|A service that synchronizes Azure file shares with Windows Servers.]].",
     points:["AzCopy — scripted or command-line transfers.","Storage Explorer — graphical browsing and transfer.","File Sync — sync Azure Files with Windows Server."],
     q:"You want a GUI for browsing and moving Azure Storage data. Use:",options:["Storage Explorer","AzCopy only"],correct:0,why:"Storage Explorer provides a graphical interface."},
    {title:"Migration",headline:"Move whole workloads or move giant boxes of data.",
     body:"[[Azure Migrate|A service for assessing and migrating servers, apps, and databases to Azure.]] supports workload migration. [[Azure Data Box|A physical appliance used to transfer large amounts of data when network transfer is impractical.]] helps with very large datasets.",
     points:["Azure Migrate — assess and move workloads.","Data Box — ship large datasets physically.","The right method depends on workload type, data volume, downtime, and network capacity."],
     q:"You have hundreds of terabytes and network transfer would take too long. Which option fits?",options:["Azure Data Box","Azure DNS"],correct:0,why:"Data Box is designed for large offline data transfer."}
  ],
  assessment:[
    ["Azure object storage is:",["Blob Storage","Azure DNS","RBAC"],0],
    ["Copies across Availability Zones are provided by:",["Zone-redundant storage","Archive tier"],0],
    ["A physical appliance for transferring very large datasets is:",["Azure Data Box","Azure Advisor"],0]
  ]
},
8:{
  world:"WORLD 2 // AZURE ARCHITECTURE & SERVICES",title:"Identity, access & security",
  source:"https://learn.microsoft.com/en-us/training/modules/describe-azure-identity-access-security/",
  quests:[
    {title:"Microsoft Entra ID",headline:"Know who the user or service is.",
     body:"[[Microsoft Entra ID|Microsoft's cloud identity and access management service.]] provides identities for users, groups, applications, and devices.",
     points:["Identity answers: who or what is requesting access?","Directory services organize identities and related information.","Microsoft Entra Domain Services can provide managed domain capabilities for workloads that need traditional domain features."],
     q:"Which Azure service is the core cloud identity directory?",options:["Microsoft Entra ID","Azure Monitor"],correct:0,why:"Microsoft Entra ID is Azure's cloud identity and access platform."},
    {title:"Authentication methods",headline:"Prove who you are.",
     body:"[[Authentication|Proving an identity is who it claims to be.]] can use passwords, [[MFA|Multifactor authentication: requiring more than one factor to verify identity.]], single sign-on, and passwordless methods.",
     points:["SSO lets one authenticated identity access multiple applications.","MFA adds another verification factor.","Passwordless methods can reduce password-related risk."],
     q:"A user signs in with a password plus an authenticator app code. This is:",options:["MFA","RBAC"],correct:0,why:"Two different authentication factors are being used."},
    {title:"External identities + Conditional Access",headline:"Who can sign in, and under what conditions?",
     body:"External identities support collaboration with people outside your organization. [[Conditional Access|Policy-based access decisions using signals such as user, device, location, risk, or application.]] decides whether and how access is allowed.",
     points:["Guest/external users can be given controlled access.","Conditional Access can require MFA or block access based on conditions.","It acts after identity signals are evaluated."],
     q:"Require MFA only when a sign-in is considered risky. Which feature?",options:["Conditional Access","Storage tier"],correct:0,why:"Conditional Access uses conditions and signals to enforce access requirements."},
    {title:"RBAC",headline:"Authentication says who. Authorization says what they can do.",
     body:"[[Authorization|Determining what an authenticated identity is allowed to do.]] in Azure commonly uses [[RBAC|Role-based access control: assigning permissions through roles at a defined scope.]].",
     points:["Roles contain sets of allowed actions.","Scopes can include management groups, subscriptions, resource groups, or resources.","Use least privilege: give only the permissions needed."],
     q:"A user should read resources but not change them. What Azure mechanism assigns that permission?",options:["RBAC role","MFA"],correct:0,why:"RBAC controls authorized actions."},
    {title:"Zero Trust + defense in depth",headline:"Assume breach. Verify explicitly. Use layers.",
     body:"[[Zero Trust|A security model that assumes no request is automatically trusted and requires explicit verification.]] pairs well with [[defense in depth|Using multiple security layers so one failure does not expose everything.]].",
     points:["Verify explicitly.","Use least privilege.","Assume breach and limit blast radius.","Layer identity, network, compute, application, and data protections."],
     q:"Which idea means one security control should not be your only protection?",options:["Defense in depth","Horizontal scaling"],correct:0,why:"Defense in depth uses multiple security layers."},
    {title:"Defender for Cloud",headline:"See security posture and threats across cloud resources.",
     body:"[[Microsoft Defender for Cloud|A cloud security posture management and workload protection service.]] helps identify recommendations, risks, and threats.",
     points:["Security posture recommendations help improve configuration.","Workload protections can detect threats.","It can cover Azure and, in supported scenarios, hybrid/multicloud resources."],
     q:"Which service provides cloud security posture recommendations and workload protection?",options:["Microsoft Defender for Cloud","Azure Cost Management"],correct:0,why:"That is the purpose of Defender for Cloud."}
  ],
  assessment:[
    ["Proving who a user is is called:",["Authentication","Authorization","Scaling"],0],
    ["Assigning Reader permissions at a resource group uses:",["RBAC","DNS","Storage tiers"],0],
    ["A layered security strategy is called:",["Defense in depth","ExpressRoute","CapEx"],0]
  ]
},
9:{
  world:"WORLD 3 // MANAGEMENT & GOVERNANCE",title:"Cost management",
  source:"https://learn.microsoft.com/en-us/training/paths/describe-azure-management-governance/",
  quests:[
    {title:"What affects cost?",headline:"Cloud cost is the result of many choices.",
     body:"Azure cost can vary with resource type, size, usage, region, bandwidth, licensing, reservation/commitment choices, and support options.",
     points:["More/larger resources generally cost more.","Region and data transfer can matter.","Turning off or removing unused resources can reduce waste."],
     q:"Which can affect Azure cost?",options:["Resource size and usage","Only the account password"],correct:0,why:"Resource configuration and consumption directly affect cost."},
    {title:"Pricing Calculator",headline:"Estimate before you deploy.",
     body:"The Azure [[Pricing Calculator|Microsoft tool for estimating expected Azure service costs before or during planning.]] lets you model configurations.",
     points:["Choose services and quantities.","Adjust configuration assumptions.","Use estimates for planning; actual usage can differ."],
     q:"Which tool helps estimate a planned Azure solution before deployment?",options:["Pricing Calculator","Azure DNS"],correct:0,why:"The Pricing Calculator is for cost estimation."},
    {title:"Cost Management",headline:"Track what you actually spend.",
     body:"[[Microsoft Cost Management|Tools for analyzing, monitoring, allocating, and optimizing cloud spending.]] works with real usage and billing information.",
     points:["View and analyze costs.","Create budgets and alerts.","Find trends and optimization opportunities."],
     q:"You need alerts when actual monthly spending approaches a limit. Use:",options:["Cost Management budgets","Availability Zones"],correct:0,why:"Budgets and cost alerts are Cost Management capabilities."},
    {title:"Tags + optimization",headline:"Label resources so cost has context.",
     body:"[[Tags|Key-value metadata attached to Azure resources for organization and reporting.]] can identify owners, departments, environments, or projects.",
     points:["Tags can support cost reporting and organization.","Tags do not replace access control.","Optimization includes right-sizing, removing waste, and choosing appropriate purchasing models."],
     q:"You want cost reports grouped by department. What can help label resources?",options:["Tags","Subnets"],correct:0,why:"Tags attach organizational metadata to resources."}
  ],
  assessment:[
    ["Which tool estimates planned Azure costs?",["Pricing Calculator","Azure Monitor","Defender for Cloud"],0],
    ["Which tool analyzes actual cloud spending and budgets?",["Cost Management","Azure DNS","RBAC"],0],
    ["Metadata such as Department=Finance is commonly stored in:",["Tags","Availability Zones","VM images"],0]
  ]
},
10:{
  world:"WORLD 3 // MANAGEMENT & GOVERNANCE",title:"Governance & compliance",
  source:"https://learn.microsoft.com/en-us/training/paths/describe-azure-management-governance/",
  quests:[
    {title:"Azure Policy",headline:"Turn organizational rules into enforceable cloud rules.",
     body:"[[Azure Policy|A governance service that evaluates resources against rules and can audit or enforce required configurations.]] helps keep resources compliant.",
     points:["Policies can audit noncompliance.","Policies can deny or modify certain deployments depending on configuration.","Initiatives group multiple policies together."],
     q:"Your company requires all resources to use approved regions. Which governance tool?",options:["Azure Policy","Azure Advisor"],correct:0,why:"Azure Policy evaluates and enforces resource rules."},
    {title:"Resource locks",headline:"Protect important resources from accidental change or deletion.",
     body:"[[Resource lock|A control that can prevent deletion or modification of Azure resources even when a user otherwise has permissions.]] adds a safety layer.",
     points:["CanNotDelete protects against deletion.","ReadOnly prevents changes.","Locks are protection against accidental administrative actions, not a replacement for RBAC."],
     q:"Admins can manage a resource, but you want to block accidental deletion. Use:",options:["Resource lock","Storage tier"],correct:0,why:"A delete-protection lock is designed for this."},
    {title:"Microsoft Purview",headline:"Understand, govern, and protect data.",
     body:"[[Microsoft Purview|Microsoft's family of data governance, risk, and compliance capabilities.]] helps organizations understand and govern data across environments.",
     points:["Data discovery and governance help understand where data exists.","Compliance capabilities help manage regulatory and information-protection needs.","Purview focuses on data governance/compliance rather than VM scaling."],
     q:"Which Microsoft family focuses on data governance and compliance?",options:["Microsoft Purview","VM Scale Sets"],correct:0,why:"Purview is Microsoft's data governance and compliance family."}
  ],
  assessment:[
    ["Enforcing allowed Azure regions is a job for:",["Azure Policy","Azure DNS","Blob Storage"],0],
    ["Preventing accidental deletion is a use for:",["Resource locks","Tags only","ExpressRoute"],0],
    ["Data governance and compliance capabilities are associated with:",["Microsoft Purview","VM Scale Sets","AzCopy"],0]
  ]
},
11:{
  world:"WORLD 3 // MANAGEMENT & GOVERNANCE",title:"Manage & deploy resources",
  source:"https://learn.microsoft.com/en-us/training/paths/describe-azure-management-governance/",
  quests:[
    {title:"Portal + Cloud Shell",headline:"Graphical when you want it. Command line when you need it.",
     body:"The [[Azure portal|Microsoft's web-based graphical interface for managing Azure.]] provides a GUI. [[Cloud Shell|A browser-accessible shell environment for Azure CLI or Azure PowerShell.]] gives command-line access without local setup.",
     points:["Portal — visual management.","Cloud Shell — command line in the browser.","Choose the interface based on task and repeatability."],
     q:"You need an Azure command line from a browser without installing tools locally. Use:",options:["Cloud Shell","Storage Explorer"],correct:0,why:"Cloud Shell provides browser-based CLI/PowerShell."},
    {title:"Azure CLI + PowerShell",headline:"Automate management from the command line.",
     body:"[[Azure CLI|A cross-platform command-line interface for Azure.]] and [[Azure PowerShell|PowerShell cmdlets for managing Azure resources.]] both support scripting and automation.",
     points:["CLI is command-oriented and cross-platform.","PowerShell integrates with PowerShell scripting and objects.","Both can automate repeatable Azure tasks."],
     q:"Which two are command-line automation choices for Azure?",options:["Azure CLI and Azure PowerShell","Azure DNS and Blob"],correct:0,why:"Both are management command-line tools."},
    {title:"Azure Arc",headline:"Extend Azure management beyond Azure.",
     body:"[[Azure Arc|A service that extends Azure management and governance to supported resources outside Azure, including on-premises and other clouds.]] brings hybrid resources into Azure management.",
     points:["Hybrid and multicloud management.","Apply supported Azure management capabilities to external resources.","Useful when infrastructure is not all hosted in Azure."],
     q:"You want Azure management capabilities for on-premises servers. Use:",options:["Azure Arc","Archive tier"],correct:0,why:"Azure Arc extends Azure management to hybrid resources."},
    {title:"IaC + ARM",headline:"Describe infrastructure as code, then deploy it consistently.",
     body:"[[Infrastructure as code|Managing infrastructure through declarative or scripted files instead of manual clicking.]] improves repeatability. [[Azure Resource Manager|Azure's deployment and management service for resources.]] processes deployments such as ARM templates.",
     points:["Templates make environments reproducible.","Version-controlled infrastructure definitions support review and consistency.","ARM coordinates deployment and management operations."],
     q:"You want the same environment deployed repeatedly from a version-controlled definition. Use:",options:["Infrastructure as code","Manual portal clicks only"],correct:0,why:"IaC makes repeatable, version-controlled deployments possible."}
  ],
  assessment:[
    ["Browser-based Azure command line is:",["Cloud Shell","Azure Advisor","Purview"],0],
    ["Extending Azure management to on-premises servers uses:",["Azure Arc","Archive storage","MFA"],0],
    ["Repeatable infrastructure defined in files is:",["Infrastructure as code","Horizontal scaling","DNS"],0]
  ]
},
12:{
  world:"WORLD 3 // MANAGEMENT & GOVERNANCE",title:"Monitoring tools",
  source:"https://learn.microsoft.com/en-us/training/paths/describe-azure-management-governance/",
  quests:[
    {title:"Azure Advisor",headline:"Get recommendations for improving your Azure environment.",
     body:"[[Azure Advisor|A service that analyzes Azure configurations and usage and provides personalized recommendations.]] can suggest improvements across areas such as cost, reliability, security, performance, and operational excellence.",
     points:["Recommendations are based on your environment.","Advisor helps identify optimization opportunities.","It is advisory; it does not replace your design decisions."],
     q:"Which service gives personalized recommendations for Azure resources?",options:["Azure Advisor","Azure DNS"],correct:0,why:"Advisor analyzes your environment and recommends improvements."},
    {title:"Service Health",headline:"Know when Azure itself is having a problem that affects you.",
     body:"[[Azure Service Health|A service providing personalized information about Azure service issues, planned maintenance, and health advisories.]] focuses on Azure platform events relevant to your resources.",
     points:["Service issues — current Azure problems.","Planned maintenance — upcoming platform work.","Health advisories — changes that may require action."],
     q:"You want to know whether an Azure outage is affecting your region and services. Use:",options:["Service Health","Cost Management"],correct:0,why:"Service Health reports Azure service events relevant to you."},
    {title:"Azure Monitor + Log Analytics",headline:"Collect signals and investigate what happened.",
     body:"[[Azure Monitor|Azure's platform for collecting, analyzing, and acting on telemetry.]] works with metrics and logs. [[Log Analytics|A tool/workspace experience for querying log data collected by Azure Monitor.]] helps investigate.",
     points:["Metrics are numeric time-series signals.","Logs contain richer event and diagnostic records.","Log queries help correlate and investigate behavior."],
     q:"You need to query logs across Azure resources to investigate an incident. Use:",options:["Log Analytics","Pricing Calculator"],correct:0,why:"Log Analytics is designed for querying collected log data."},
    {title:"Alerts + Application Insights",headline:"Notice problems automatically and see what the app is doing.",
     body:"Azure Monitor [[alerts|Rules that notify or trigger actions when monitored conditions are met.]] can react to signals. [[Application Insights|Application performance monitoring capabilities in Azure Monitor for live applications.]] helps observe app performance and behavior.",
     points:["Alerts can respond to metrics, logs, and other signals.","Application Insights tracks application requests, dependencies, failures, and performance.","Monitoring should lead to action, not just dashboards."],
     q:"You want to detect slow web requests and application failures. Use:",options:["Application Insights","Resource locks"],correct:0,why:"Application Insights focuses on application performance and behavior."}
  ],
  assessment:[
    ["Personalized optimization recommendations come from:",["Azure Advisor","Azure DNS","AzCopy"],0],
    ["Azure platform outages and planned maintenance are shown in:",["Service Health","RBAC","Tags"],0],
    ["Application performance monitoring is provided by:",["Application Insights","ExpressRoute","Archive tier"],0]
  ]
}
};

function moduleQuestCard(moduleNumber,quest,index,total){
  const bullets=quest.points.map(p=>`<li>${explainTerms(p)}</li>`).join("");
  const options=quest.options.map((o,i)=>`<button class="choice-btn generic-choice" data-answer="${i}">${o}</button>`).join("");
  return `
  <section class="generated-quest quest pixel-panel ${index===0?"active":""}" data-gquest="${index}">
    <div class="quest-copy">
      <p class="eyebrow">QUEST ${String(index+1).padStart(2,"0")} // ${quest.title.toUpperCase()}</p>
      <h2>${quest.headline}</h2>
      <p class="lead">${explainTerms(quest.body)}</p>
    </div>
    <div class="concept-stack"><ul>${bullets}</ul></div>
    <div class="mini-quest">
      <p class="eyebrow">TEACHING QUEST // CHECK THE IDEA</p>
      <h3>${quest.q}</h3>
      <div class="choice-grid">${options}</div>
      <div class="feedback" aria-live="polite"></div>
    </div>
    <button class="primary-btn generic-next locked-btn" disabled>🔒 ANSWER CORRECTLY TO CONTINUE</button>
  </section>`;
}

function assessmentHtml(moduleNumber,module){
  return `
  <section class="module-assessment quest pixel-panel" data-assessment>
    <div class="quest-copy">
      <p class="eyebrow">MODULE ${moduleNumber} // GATE TEST</p>
      <h2>Prove the module before the next one unlocks.</h2>
      <p class="lead">These are original CertStack checks based on the published learning objectives. Score at least 2 / 3 to unlock the next module.</p>
    </div>
    <div class="assessment-list">
      ${module.assessment.map((item,qIndex)=>`
        <div class="assessment-question" data-test-q="${qIndex}">
          <h3>${qIndex+1}. ${item[0]}</h3>
          <div class="answer-list">
            ${item[1].map((option,oIndex)=>`<button class="answer-btn test-answer" data-value="${oIndex}">${option}</button>`).join("")}
          </div>
        </div>`).join("")}
    </div>
    <button class="primary-btn submit-module-test">SUBMIT MODULE TEST</button>
    <div class="feedback module-test-feedback" aria-live="polite"></div>
  </section>`;
}

function renderGeneratedModules(){
  const mount=document.getElementById("generatedModules");
  if(!mount) return;
  mount.innerHTML=Object.entries(moduleCatalog).map(([number,module])=>{
    const n=Number(number);
    const questNodes=module.quests.map((q,i)=>`<button class="map-node ${i===0?"active":""}" data-gmap="${i}" disabled>${i+1}<br><span>${q.title.toUpperCase()}</span></button>`).join('<div class="map-line"></div>');
    return `
    <div id="module${n}" class="module-screen generated-module" data-module="${n}">
      <section class="module2-hero pixel-panel">
        <div><p class="eyebrow">MODULE ${n} OF 12 // ${module.world}</p><h2>${module.title}</h2>
        <p class="lead">Learn each concept first, pass the teaching checks, then pass the module gate test to unlock the next module.</p></div>
        <div class="module2-meta"><span>${module.quests.length} TEACHING QUESTS</span><span>PASS 2 / 3 TO ADVANCE</span></div>
      </section>
      <nav class="quest-map pixel-panel generated-quest-map" aria-label="Module ${n} quest map">${questNodes}<div class="map-line"></div><button class="map-node assessment-node" disabled>★<br><span>MODULE TEST</span></button></nav>
      ${module.quests.map((q,i)=>moduleQuestCard(n,q,i,module.quests.length)).join("")}
      ${assessmentHtml(n,module)}
      <section class="module-complete-panel quest pixel-panel" data-module-complete>
        <div class="completion"><div class="reward-star">★</div><p class="eyebrow">MODULE COMPLETE</p><h2>${module.title}</h2>
        <p>You passed the gate test. The next module is now unlocked and this module stays available for review.</p>
        <button class="primary-btn go-next-module">${n<12?"CONTINUE TO MODULE "+(n+1)+" →":"AZ-900 CORE COURSE MAP COMPLETE ★"}</button>
        <button class="secondary-btn replay-generated-module">REVIEW THIS MODULE</button></div>
      </section>
      <div class="module-source pixel-panel"><span>Source mapping: Microsoft Learn + current AZ-900 study guide</span>
      <a href="${module.source}" target="_blank" rel="noreferrer">OFFICIAL SOURCE ↗</a></div>
    </div>`;
  }).join("");
}

// ---------- LEARN → VOCAB MATCH → EXAM PRACTICE ----------
const module1StudyData={
  vocab:[
    ["Cloud computing","Getting computing services over the internet instead of owning every piece of physical infrastructure yourself."],
    ["Virtual machine (VM)","A software-defined computer that runs on physical hardware owned by a cloud provider."],
    ["Shared responsibility","The division of security and management duties between the cloud provider and the customer."],
    ["Public cloud","Cloud resources operated by a third-party provider and offered to customers over shared provider infrastructure."],
    ["Private cloud","A cloud environment dedicated to a single organization."],
    ["Hybrid cloud","An environment that connects public cloud and private or on-premises resources."],
    ["CapEx","Up-front spending to buy physical infrastructure such as servers and networking equipment."],
    ["OpEx","Ongoing spending for services as they are consumed."]
  ],
  practice:[
    ["A retailer needs extra computing capacity for six weeks each year and does not want to buy servers that sit idle the rest of the year. Which cloud characteristic best supports this requirement?",["Consumption-based usage","Private cloud only","Capital expenditure","Physical host ownership"],0,"Cloud services can be consumed when needed and reduced when demand falls."],
    ["In a public cloud environment, who is responsible for maintaining the physical servers and datacenter cooling?",["The cloud provider","The customer","The application users","Both equally for the physical hardware"],0,"The provider owns and maintains the physical datacenter infrastructure."],
    ["A company keeps regulated systems in its own datacenter but uses Azure for temporary web capacity. Which cloud model is this?",["Hybrid cloud","Public cloud only","Private cloud only","SaaS"],0,"Hybrid cloud combines private/on-premises resources with public cloud resources."],
    ["Which spending model is most closely associated with purchasing servers before they are needed?",["CapEx","OpEx","Consumption-based billing","Serverless"],0,"Buying physical infrastructure up front is capital expenditure."],
    ["Which statement about a cloud VM is correct?",["It runs on real physical hardware managed by the provider","It does not require physical hardware anywhere","The customer must power the Azure datacenter","It cannot connect to storage or networks"],0,"A VM is virtualized compute running on physical provider infrastructure."],
    ["An organization wants cloud resources available to customers over infrastructure operated by a third-party provider. Which model is being described?",["Public cloud","Private cloud","Hybrid cloud","On-premises only"],0,"That is the basic public-cloud model."]
  ]
};

const extraPractice={
  2:[
    ["A workload must stay online if one server fails. Which benefit is the primary design goal?",["High availability","Vertical scaling","CapEx","Private networking"],0,"High availability focuses on keeping services accessible when failures occur."],
    ["A team increases the CPU and memory assigned to one VM. What type of scaling is this?",["Vertical scaling","Horizontal scaling","Geo-redundancy","Failover"],0,"Vertical scaling makes a single resource larger or more powerful."],
    ["Which cloud benefit most directly helps an organization enforce required standards across resources?",["Governance","Archive storage","DNS","ExpressRoute"],0,"Governance provides policies and controls for consistent standards."]
  ],
  3:[
    ["A company wants maximum control over the guest operating system while avoiding ownership of physical servers. Which model fits best?",["IaaS","PaaS","SaaS","Serverless only"],0,"IaaS provides virtualized infrastructure while leaving the guest OS under customer management."],
    ["Developers want to deploy an application while the provider manages the operating system and runtime. Which service model?",["PaaS","IaaS","SaaS","Private cloud"],0,"PaaS shifts more platform management to the provider."],
    ["Which service model normally leaves the customer with the least infrastructure-management responsibility?",["SaaS","IaaS","PaaS","Hybrid"],0,"SaaS delivers a finished application and shifts most platform management to the provider."]
  ],
  4:[
    ["Which Azure construct is primarily a billing and access-management boundary that contains resource groups?",["Subscription","Region","Availability Zone","Datacenter"],0,"Azure subscriptions contain resource groups and act as billing/access boundaries."],
    ["A policy must apply across several Azure subscriptions. Where can it be assigned to create the broadest shared scope?",["Management group","Individual VM","Availability Zone","Subnet"],0,"Management groups sit above subscriptions and support governance across them."],
    ["Which design places resources in physically separate datacenter locations within the same Azure region?",["Availability Zones","Resource groups","Tags","Subscriptions"],0,"Availability Zones are physically separate locations within a supported region."]
  ],
  5:[
    ["Which Azure compute option is best for event-driven code that should run without managing dedicated servers?",["Azure Functions","Virtual Machines only","Azure DNS","Blob Storage"],0,"Azure Functions is a serverless, event-driven compute service."],
    ["A company needs many identical VMs and wants the number of instances to change with demand. Which service is designed for this?",["VM Scale Sets","Azure Files","Resource locks","Microsoft Purview"],0,"VM Scale Sets deploy and scale groups of similar VMs."],
    ["Which option is generally lighter weight than a full VM because it shares the host operating-system kernel?",["Container","Availability Zone","VPN Gateway","Subscription"],0,"Containers package apps and dependencies while sharing the host kernel."]
  ],
  6:[
    ["Two Azure virtual networks must communicate privately. Which feature is designed for this?",["VNet peering","Azure Policy","Cost Management","Archive tier"],0,"VNet peering directly connects Azure virtual networks."],
    ["A company needs an encrypted connection from its office to Azure over the public internet. Which service is appropriate?",["VPN Gateway","ExpressRoute only","Azure Advisor","RBAC"],0,"VPN Gateway supports encrypted tunnels over the public internet."],
    ["Which Azure networking concept creates smaller logical network segments inside a VNet?",["Subnet","Subscription","Storage account","Management group"],0,"Subnets divide a VNet address space into smaller segments."]
  ],
  7:[
    ["Which Azure Storage service is most appropriate for managed SMB file shares?",["Azure Files","Blob Storage","Azure DNS","Log Analytics"],0,"Azure Files provides managed file shares."],
    ["Which redundancy choice stores copies across separate availability zones within one region?",["Zone-redundant storage","Locally redundant storage","Archive tier","Hot tier"],0,"Zone-redundant storage replicates data across availability zones."],
    ["Which tool is best suited to command-line copying of data to and from Azure Storage?",["AzCopy","Azure Advisor","Microsoft Purview","Conditional Access"],0,"AzCopy is Microsoft's command-line data transfer utility for Azure Storage."]
  ],
  8:[
    ["A user has successfully signed in. Which concept determines what that user is allowed to do next?",["Authorization","Authentication","Scalability","Redundancy"],0,"Authentication proves identity; authorization determines permitted actions."],
    ["Which Azure feature can require MFA based on sign-in risk or device conditions?",["Conditional Access","Azure DNS","Storage Explorer","VM Scale Sets"],0,"Conditional Access evaluates signals and applies access requirements."],
    ["Which principle recommends granting only the permissions necessary to perform a task?",["Least privilege","Horizontal scaling","Geo-redundancy","Capital expenditure"],0,"Least privilege reduces unnecessary access."]
  ],
  9:[
    ["A finance team wants an alert when monthly Azure spending approaches a target amount. Which feature should they use?",["Cost Management budget","Availability Zone","Azure DNS","VNet peering"],0,"Cost Management budgets can track spend and generate alerts."],
    ["Before deploying a proposed architecture, which tool should be used to estimate its expected Azure cost?",["Pricing Calculator","Service Health","Application Insights","Azure Policy"],0,"The Pricing Calculator is designed for pre-deployment cost estimates."],
    ["Which action is most likely to reduce avoidable Azure cost?",["Remove or right-size unused resources","Add more tags only","Create more subscriptions","Increase every VM size"],0,"Eliminating waste and right-sizing resources are core cost-optimization practices."]
  ],
  10:[
    ["A resource must not be deleted accidentally even by an administrator with normal management permissions. What should be applied?",["Resource lock","Tag","Availability Zone","Pricing Calculator"],0,"A CanNotDelete resource lock protects against accidental deletion."],
    ["Which Azure governance service evaluates resources against organizational rules?",["Azure Policy","Azure Monitor","Azure DNS","AzCopy"],0,"Azure Policy audits and can enforce resource configuration rules."],
    ["Which Microsoft service family is associated with data governance, compliance, and information protection?",["Microsoft Purview","VM Scale Sets","ExpressRoute","Azure Files"],0,"Microsoft Purview provides data governance and compliance capabilities."]
  ],
  11:[
    ["Which Azure tool provides a browser-based environment for Azure CLI and Azure PowerShell?",["Cloud Shell","Application Insights","Service Health","Data Box"],0,"Cloud Shell provides browser-accessible command-line environments."],
    ["An organization wants to manage supported on-premises servers through Azure management capabilities. Which service?",["Azure Arc","Azure DNS","Blob Storage","Cost Management"],0,"Azure Arc extends Azure management to hybrid and multicloud resources."],
    ["What is the main benefit of infrastructure as code?",["Repeatable, version-controlled deployments","Eliminating all security requirements","Making every resource free","Replacing networking"],0,"Infrastructure as code improves repeatability, consistency, and version control."]
  ],
  12:[
    ["Which service should an administrator check for Azure platform incidents and planned maintenance that may affect their resources?",["Service Health","Azure Advisor","RBAC","Pricing Calculator"],0,"Service Health provides personalized Azure service issues and maintenance information."],
    ["Which Azure Monitor capability is intended for querying collected log data?",["Log Analytics","ExpressRoute","Resource locks","Azure Policy"],0,"Log Analytics is used to query and analyze log data."],
    ["A developer wants telemetry about web request duration, dependencies, and application failures. Which feature?",["Application Insights","Azure Files","Microsoft Purview","VNet peering"],0,"Application Insights provides application performance monitoring telemetry."]
  ]
};

function getPracticeQuestions(moduleNumber,module){
  return [...module.assessment,...(extraPractice[moduleNumber]||[])];
}
function getModuleVocab(module){
  const found=[];
  const seen=new Set();
  module.quests.forEach(q=>{
    [...q.body.matchAll(/\[\[([^|\]]+)\|([^\]]+)\]\]/g)].forEach(match=>{
      const key=match[1].trim().toLowerCase();
      if(!seen.has(key)){
        seen.add(key);
        found.push([match[1].trim(),match[2].trim()]);
      }
    });
  });
  // Keep the game useful even in modules with only a few inline terms.
  module.quests.forEach(q=>{
    if(found.length>=6) return;
    const label=q.title;
    const definition=q.points[0]?.replace(/^[A-Z +/&-]+ — /,"") || q.headline;
    const key=label.toLowerCase();
    if(!seen.has(key)){
      seen.add(key);
      found.push([label,definition]);
    }
  });
  return found.slice(0,8);
}
function vocabHtml(moduleNumber,module){
  const vocab=getModuleVocab(module);
  return \`
  <section class="module-vocab quest pixel-panel" data-vocab>
    <div class="quest-copy">
      <p class="eyebrow">LEARNING GAME // VOCAB MATCH</p>
      <h2>Match the words to what they actually mean.</h2>
      <p class="lead">Pick a term, then pick its definition. This is the memory round before exam practice.</p>
    </div>
    <div class="vocab-game" data-vocab-game>
      <div class="vocab-column vocab-terms">
        <h3>TERMS</h3>
        \${vocab.map((v,i)=>\`<button class="vocab-card vocab-term" data-match="\${i}">\${v[0]}</button>\`).join("")}
      </div>
      <div class="vocab-column vocab-definitions">
        <h3>DEFINITIONS</h3>
        \${[...vocab].reverse().map((v,revIndex)=>{
          const original=vocab.length-1-revIndex;
          return \`<button class="vocab-card vocab-definition" data-match="\${original}">\${v[1]}</button>\`;
        }).join("")}
      </div>
    </div>
    <div class="feedback vocab-feedback" aria-live="polite"></div>
    <button class="primary-btn vocab-next locked-btn" disabled>🔒 MATCH ALL TERMS TO OPEN EXAM PRACTICE</button>
  </section>\`;
}
function assessmentHtml(moduleNumber,module){
  const questions=getPracticeQuestions(moduleNumber,module);
  return \`
  <section class="module-assessment quest pixel-panel" data-assessment>
    <div class="quest-copy">
      <p class="eyebrow">MODULE \${moduleNumber} // EXAM PRACTICE</p>
      <h2>Now answer it the way the exam might ask it.</h2>
      <p class="lead">These are original CertStack exam-style questions based on Microsoft's published AZ-900 skills measured. They are not copied Microsoft exam questions. Score at least 4 / 6 to unlock the next module.</p>
    </div>
    <div class="assessment-list">
      \${questions.map((item,qIndex)=>\`
        <div class="assessment-question" data-test-q="\${qIndex}">
          <h3>\${qIndex+1}. \${item[0]}</h3>
          <div class="answer-list">
            \${item[1].map((option,oIndex)=>\`<button class="answer-btn test-answer" data-value="\${oIndex}">\${option}</button>\`).join("")}
          </div>
          <div class="question-rationale"></div>
        </div>\`).join("")}
    </div>
    <button class="primary-btn submit-module-test">SUBMIT EXAM PRACTICE</button>
    <div class="feedback module-test-feedback" aria-live="polite"></div>
  </section>\`;
}
function renderGeneratedModules(){
  const mount=document.getElementById("generatedModules");
  if(!mount) return;
  mount.innerHTML=Object.entries(moduleCatalog).map(([number,module])=>{
    const n=Number(number);
    const questNodes=module.quests.map((q,i)=>\`<button class="map-node \${i===0?"active":""}" data-gmap="\${i}" disabled>\${i+1}<br><span>\${q.title.toUpperCase()}</span></button>\`).join('<div class="map-line"></div>');
    return \`
    <div id="module\${n}" class="module-screen generated-module" data-module="\${n}">
      <section class="module2-hero pixel-panel">
        <div><p class="eyebrow">MODULE \${n} OF 12 // \${module.world}</p><h2>\${module.title}</h2>
        <p class="lead">Learn the concepts, lock in the vocabulary, then switch to exam-style practice.</p></div>
        <div class="module2-meta"><span>\${module.quests.length} TEACHING QUESTS</span><span>VOCAB MATCH</span><span>6 EXAM-STYLE QUESTIONS</span></div>
      </section>
      <nav class="quest-map pixel-panel generated-quest-map" aria-label="Module \${n} learning map">\${questNodes}<div class="map-line"></div><button class="map-node vocab-node" disabled>◆<br><span>VOCAB MATCH</span></button><div class="map-line"></div><button class="map-node assessment-node" disabled>★<br><span>EXAM PRACTICE</span></button></nav>
      \${module.quests.map((q,i)=>moduleQuestCard(n,q,i,module.quests.length)).join("")}
      \${vocabHtml(n,module)}
      \${assessmentHtml(n,module)}
      <section class="module-complete-panel quest pixel-panel" data-module-complete>
        <div class="completion"><div class="reward-star">★</div><p class="eyebrow">MODULE COMPLETE</p><h2>\${module.title}</h2>
        <p>You passed the exam-practice gate. The next module is now unlocked and this module stays available for review.</p>
        <button class="primary-btn go-next-module">\${n<12?"CONTINUE TO MODULE "+(n+1)+" →":"AZ-900 CORE COURSE MAP COMPLETE ★"}</button>
        <button class="secondary-btn replay-generated-module">REVIEW THIS MODULE</button></div>
      </section>
      <div class="module-source pixel-panel"><span>Original CertStack practice mapped to Microsoft Learn / AZ-900 objectives</span>
      <a href="\${module.source}" target="_blank" rel="noreferrer">OFFICIAL SOURCE ↗</a></div>
    </div>\`;
  }).join("");
}

renderGeneratedModules();
