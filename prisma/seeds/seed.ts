import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  // ... you will write your Prisma Client queries here to insert data



  const author = await prisma.author.create({
    data: {
      // Provide author details here
      // For example:
      // id         Int       @id @unique @default(autoincrement())
      // name       String
      // jobTitle   String
      // degree     String
      // college    String
      // city       String
      // about      String
      // imageUrl   String
      // linkdInUrl String
      // createdAt  DateTime  @default(now())
      // updatedAt  DateTime  @updatedAt
      // Product    Product[]
      id: 1,
      name: "Ajay Garg",
      jobTitle: "Sourcing & SCM Expert",
      degree: "B. E. (Mech.) 1994",
      college: "Delhi \n College of Engineering,",
      city: "Delhi",
      about: `comes from a very humble, self-made family. He is born and brought up in Delhi. His father, Sh. R.C. Garg
      is the first person to graduate among his siblings while his grandfather, late Sh. D.P. Garg was a cloth
      merchant in the U.P. district of Muzaffar Nagar. His father started his career in Delhi as a government
      servant way back in the year 1970 and retired as Deputy Director from Home Ministry in the year Ajay went
      on to graduate in Mechanical Engineering from Delhi College of Engineering, Delhi in the year 1994. He
      possesses an overall experience of 28+ years with a very unique mix of finely balanced tenure of 14 years
      each in automotive and consulting companies where he has been instrumental in the Strategic Sourcing and
      SCM functions to bring process and cost efficiency to his employers and clients ever since 1994.`,
      imageUrl: "/images/author.jpeg",
      linkdInUrl: "https://www.linkedin.com/company/s2p-pace/",
      // Other author fields
    },
  });

  const book_one = await prisma.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Fundamentals of Sourcing & Procurement - Part 1',
      titleSlug: 'fundamentals-of-sourcing-and-procurement-part-one',
      description: `The book (Part 1 & Part 2) captures my 28 years of learning and growth in the area of Strategic Sourcing and Supply Chain Management.
      The topics covered and the content assimilated could be extremely valuable to anyone who aspires to make a lasting and rewarding career in the area of Sourcing & Procurement and/or Procurement Operations & SCM.
      You will find every page of the book adding to your knowledge as you progress logically, reading chapter after chapter. You would also find the aesthetics pleasing to the eye as if you are going through a storyline in a presentation style.
      Part 1 of the book especially showcase all that you need from Spend Management, negotiations through Contracting and Inventory Management.
      The uniqueness of the book is evident from the macro-enabled spreadsheets and templates provided along with the chapters to make it more practical to apply in your daily work.`,
      thumbUrl: "[\"/images/book_part1_bg.png\", \"/images/book_part1_2.jpeg\"]",
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: 5,
      priceDigital: 945,
      priceHardCopy: 1350,
      authorId: author.id,
      links : {
        createMany: {
          data: [{
            link: "books/Book_1.zip"
              }]
        }
      },
      Chapter: {
        createMany: {
          data:  [
            {
              number: 0,
              price: 1,
           
                
          
            category: "CHAPTER",
            title: "Understanding Procurement as a Value Creation Function",
            imageUrl: "/images/ch/Chapter_0.png",
            heading: `How many of you think that Procurement is a thankless job? Well, irrespective of what you think, the reality is that it is not. On the contrary, it is one of the core functions just like Sales or Manufacturing…`,
            introduction: JSON.stringify([
              "Procurement Function started getting into the limelight only in the past about 12-13 years, and before that, it was not even thought of as a proactive career option. The young graduates used to find themselves doing procurement by virtue of the organization's need and not by the career choice of the individual",
              "So much so that there were hardly any specialization courses available for Procurement as a subject to learn and master. The job descriptions were not asking for any special requirements for a Procurement profile, and ending up doing procurement was considered as anybody's job while actually it was not",
              "This chapter shall draw a lot of focus on the role and importance of Procurement as a Core Function to enable any company to run efficiently and resourcefully. After reading this, I hope that you would gain immense respect for yourself as a Buyer in any organization",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The Core and Non-core functions of an organization through my lens",
              "The Importance of Procurement Function and what it does to steer and lubricate the organization's engine",
              "Roles and Responsibilities of Procurement that go way beyond the cost savings",
              "Procurement as an important face of any organization that talks volumes about the Culture and Professionalism while dealing with Suppliers",
            ]),
          },
          {
            number: 1,
            title: "Spend Diagnostic and Solution Identification",
            imageUrl: "/images/ch/Chapter_1.png",
            price: 99,
            category: "CHAPTER",
            heading:
              "A structured methodology to Identify Gaps and Prepare for Transformation",
            introduction: JSON.stringify([
              "Common man visits a doctor or a specialist when there is a feeling of uneasiness or symptoms pointing towards some abnormality; Drawing a corollary, a CEO/CFO/CPO* approaches a consultant as and when there is some uneasiness and/or difficulty in achieving the set goals for the organization",
              "And likewise, as a specialist after doing some initial checks prescribes clinical tests and/or procedures, a consultant prescribes for a diagnostic exercise to arrive at the root cause(s) that are contributing to the downtrend of the key performance metrics",
              "This chapter shall focus on the steps followed in identifying a solution that entails studying the existing process gaps, and depending upon the current status, preparing the organization for transformation into a future advanced state…",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The importance and milestones of a diagnostic exercise",
              "The questions that need to be asked while interviewing the stakeholders to assess the current processes",
              "How to interpret the parameters and identify gaps, explained with the help of a couple of examples",
              "The four states of maturity of any organization to assess the time and effort based on its current state and aspirations",
              "The tools that are used to map current processes and design the future state",
              "The key investment and management decisions that need to be thought through to build or improve efficiency",
              "About a few KPIs and metrics that need to be monitored and reported to assess the progress in the transformation journey",
            ]),
          },
          {
            number: 2,
            price: 99,
            category: "CHAPTER",
            title: "Project Assessment and Data Collection",
            imageUrl: "/images/ch/Chapter_2.png",
            heading:
              "The assessment helps to prepare for success by systematic evaluation of project’s boundary conditions",
            introduction: JSON.stringify([
              "Launching a Sourcing Project is a significant start point that deserves a fair amount of preparation and planning to maximize the chances of success and/or favorable outcome",
              "This preparation in Procurement World is termed as ‘Project Risk Assessment’ or simply Project Assessment. It is based on Data Collection in phase 1. We also have a phase 2 of Data Collection stage that is beyond the scope of this course",
              "During the assessment, we study the boundary conditions, prerequisites, baselines, stakeholder expectations, and market conditions to build a laser-sharp response and preparation against potential risks and/or roadblocks. We also decide the measurement criteria of success at this stage of Project Assessment",
              "This chapter shall make you learn about the above-said preparation to minimize risks and exponentially increase your chances of success",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The process of conducting the assessment that can be applied as a standard operating procedure for almost all the categories for a successful sourcing outcome meeting stakeholders’ expectation",
              "How to arm yourself beforehand against all the potential pitfalls during the course of the project through initial data collection",
              "The important preparatory steps before launching a sourcing project",
              "How to use the assessment effectively to launch or shelve a project based on the risk assessment"
            ]),
          },
          {
            number: 3,
            price: 149,
            category: "CHAPTER",
            title: "RFI and RFQ Management",
            imageUrl: "/images/ch/Chapter_3.png",
            heading: "The Art of RFx Management in Procurement",
            introduction: JSON.stringify([
              "Request for Information (RFI) and Request for Quotation (RFQ) are the standard procedures used to collect the relevant data to invite and engage with the suppliers in a structured way. An RFI usually precedes the RFQ but not always, depending upon the nature of the category and the target supply base and their known availability and performance in the market",
              "Depending upon the result of the RFQ response evaluation, sometimes, a direct negotiation without following the RFx route also gets conducted. This approach is normally reserved for established and regularly purchased categories and commodities that have ready benchmarks available",
              "RFx when used systematically and strategically, the process can potentially yield substantial savings opportunities to meet the organizational goal",
              "This chapter will familiarize you with the process of RFI/RFQ Management in Procurement",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The relevance and scope of RFI in sourcing process",
              "The steps involved in RFI/RFQ process and their sequencing",
              "The process of sending out RFI/RFQ documents and collecting and evaluating the responses",
              "How to do it ‘a s k’ way – as explained by Linda Swindling, the author of the book, ‘Ask Outrageously’",
              "The key considerations to keep in mind while doing the evaluation of RFI/RFQ responses",
            ]),
          },
          {
            number: 4,
            price: 99,
            category: "CHAPTER",
            title: "Sourcing Strategy and Approach",
            imageUrl: "/images/ch/Chapter_4.png",
            heading: "It starts with the category understanding; to become an expert first and then build the strategy!!",
            introduction: JSON.stringify([
              "The success of any procurement function depends on many factors and the most important one is the choice of sourcing strategy and its implementation",
              "Sourcing Strategies differ from category to category and also depend upon internal and external conditions that affect the execution of the chosen sourcing strategy. The importance of choosing a correct sourcing strategy cannot be overemphasized",
              "This chapter shall take you through a journey of how to design a sourcing strategy depending upon the internal and external factors of category and why some of the sourcing strategies fail and how to turn around the situation",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The importance of choosing a correct sourcing strategy",
              "How to choose the right strategy depending upon the conditions that affect the execution of the chosen sourcing strategy",
              "How to build category expertise and choose a sourcing strategy based on your expertise",
              "The reasons why some sourcing strategies fail and how to turn around the situation",
              "About various types of strategies and what works best in which situation",
            ]),
          },
          {
            number: 5,
            price: 99,
            category: "CHAPTER",
            title: "Supplier Market Assessment",
            imageUrl: "/images/ch/Chapter_5.png",
            heading: "It starts with the category understanding; to become an expert first and then build the strategy!!",
            introduction: JSON.stringify([
              "Understanding the supplier market is one of the crucial steps before proceeding with any sourcing project. A thorough supplier market assessment helps in making informed decisions about the sourcing strategy and supplier selection.",
              "This chapter focuses on the process of assessing the supplier market, which involves gathering information about potential suppliers, evaluating their capabilities, and identifying key market trends and dynamics that can impact the sourcing strategy.",
              "By the end of this chapter, you will have a clear understanding of how to conduct a supplier market assessment and leverage the insights gained to develop a successful sourcing strategy.",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The importance of supplier market assessment in the sourcing process",
              "The steps involved in conducting a supplier market assessment",
              "How to gather information about potential suppliers and evaluate their capabilities",
              "How to identify key market trends and dynamics that can impact the sourcing strategy",
              "How to leverage the insights from the supplier market assessment to develop a successful sourcing strategy",
            ]),
          },
          {
            number:  6,
            price: 99,
            category: "CHAPTER",
            title: "Cost Modeling",
            imageUrl: "/images/ch/Chapter_6.png",
            heading: "A Guide to Understanding and Applying Cost Models in Procurement",
            introduction: JSON.stringify([
              "Cost modeling is a valuable tool in procurement that helps organizations understand and analyze the cost structure of goods and services. By creating cost models, procurement professionals can gain insights into the cost drivers, assess supplier proposals, and make informed decisions that lead to cost savings.",
              "This chapter explores the concept of cost modeling in depth, covering topics such as cost components, cost drivers, and the process of creating a cost model. You will learn how to use cost models effectively to negotiate with suppliers and achieve better pricing outcomes.",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The importance of cost modeling in procurement",
              "The key components of a cost model and how to identify cost drivers",
              "The process of creating a cost model and using it to analyze supplier proposals",
              "How to leverage cost models in supplier negotiations to achieve cost savings",
            ]),
          },
          {
            number: 7,
            price: 49,
            category: "CHAPTER",
            title: "Supplier Evaluation and Selection",
            imageUrl: "/images/ch/Chapter_7.png",
            heading: "Choosing the Right Suppliers for Your Sourcing Project",
            introduction: JSON.stringify([
              "Supplier evaluation and selection are critical steps in the sourcing process. Making the right choices when it comes to suppliers can significantly impact the success of your sourcing project and the overall performance of your organization.",
              "In this chapter, you will learn about the importance of supplier evaluation and selection, the criteria and factors to consider when assessing suppliers, and the methods and tools available for making informed decisions. By the end of this chapter, you will be equipped with the knowledge and skills to choose the right suppliers for your sourcing projects.",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The significance of supplier evaluation and selection in the sourcing process",
              "The criteria and factors to consider when assessing suppliers",
              "The methods and tools available for supplier evaluation and selection",
              "How to make informed decisions when choosing suppliers for your sourcing projects",
            ]),
          },
          {
            number:  8,
            price: 99,
            category: "CHAPTER",
            title: "Cost Structure and Cost Driver Analysis",
            imageUrl: "/images/ch/Chapter_8.png",
            heading: "Understanding the Difference and Importance",
            introduction: JSON.stringify([
              "Cost Structure and Cost Driver analysis are two of the important characteristics in establishing the applicability of sourcing strategy to any category. It is extremely important therefore for a procurement manager to understand -",
              "Typical Cost Structure of goods and/or services and",
              "Important Cost Drivers to consider while preparing for negotiations for any category",
              "Cost Structure (also called cost build-up) helps in ensuring a visibility of Total Cost of Ownership and also aids in Cost Comparison",
              "On the other hand, Cost Driver analysis tells us about those cost elements that need to be in focus to estimate the degree of compressibility depending upon the market conditions",
              "This Chapter shall take you through a journey from point A to point B and after completion of the course, you would have a good understanding of Cost Structures and Cost Drivers",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The elements of cost that build up the total cost of any good or service",
              "With the examples given on how to compare cost proposals from two or more suppliers",
              "The elements of cost that majorly drive the total cost and how any fluctuation in these elements directly affects the total cost",
              "The importance of cost drivers that requires research and knowledge to be able to devise strategies to contain or drive the cost down",
              "How to estimate the savings’ potential based on the knowledge of cost drivers and their cost trends",
            ]),
          },
      
          {
            number:  9,
            price: 149,
            category: "CHAPTER",
            title: "Negotiation Strategy",
            imageUrl: "/images/ch/Chapter_9.png",
            heading:   
              "The Bible of a Procurement Professional. Preparation Keeps You Ahead of the Curve", 
            introduction: JSON.stringify([
              "Negotiation Strategy has always been a prime focus area for any Procurement Professional. While these strategies are well explained in the textbooks, the approach and their application are learned, going through the scenarios over years of experience. It’s a science and an art and quite sometimes depend upon factors that may look mundane but are quite significant!!",
              "Preparations for Negotiations is the key to get the most you want as an outcome. Being aware of the elements at play during any negotiation makes a big difference in terms of the ability of a negotiator to influence the other party. Striking a balance, maintaining your poise and humility and a show of respect also play an extremely important role.",
              "This Chapter shall focus on the options available to a negotiator to prepare well even before taking up any negotiation exercise. It will also deal with the aspects that one must keep in mind during the negotiations, right there in the conference room when one is in the midst of the heat.",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The important steps and approach toward any important negotiation assignment",
              "Some of the prerequisites or a checklist before entering into a negotiation – to cover the preparation and planning phase",
              "Some of the important considerations to keep in mind right on the day of Negotiation",
              "How to effectively use the prior knowledge of BATNA",
              "How to do it ‘a s k’ way – as explained by Linda Swindling, the author of the book, ‘Ask Outrageously’",
              "A few references and notes on negotiations",
            ]),
          },
          {
            number: 10,
            price: 99,
            category: "CHAPTER",
            title: "Supplier Site Assessment",
            imageUrl: "/images/ch/Chapter_10.png",
            heading: "",
            introduction: JSON.stringify([
              "Supplier Site Assessment (SSA) is one of the most important aspects while making a final award decision in favor of any supplier. There are essentially two schools of thought here –",
              "Companies at times do the SSA before conducting the final round of negotiations. In such cases, SSA becomes a pre-qualification exercise to mitigate supply risks.",
              "Doing the SSA after concluding the final round of negotiations is another way to decide the award of business. The advantage is a reduction of efforts as the target suppliers to assess can be clearly prioritized based on a composite rating inclusive of both quality and price.",
              "Conducting an SSA requires skills and a systematic approach to do a 360-degree assessment in the time available. Usually, the assessment runs one full day, and the steps need to be judiciously selected to audit the sub-processes to arrive at a comprehensive health card.",
              "This Chapter shall take you through a journey from point A to point B, and after completion of the course, you would gain the knowledge around conducting a Supplier Site Assessment of a goods’ supplier… The course shall also list down considerations that can be applied to a services’ supplier.",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The preparations that are required to be made before embarking upon any supplier site assessment",
              "Salient parameters/heads/topics that are required to be visited/covered for an all-round assessment",
              "Questions that need to be answered in the selected heads and methodology of rating based on the findings in respect of the questions",
              "Consolidation of ratings in various heads to come to a single score that reflects the supplier’s credentials, highlights the strong and weak areas and assists procurement managers to take an informed decision on the award of business",
              "Making a final recommendation about the assessment as a subject matter expert",
            ]),
          },
          {
            number: 11,
            price: 149,
            category: "CHAPTER",
            title: "Business Award and Contracting",
            imageUrl: "/images/ch/Chapter_11.png",
            heading: "- One of the Equally Important and Crucial Final Steps in the 9-Step Sourcing Process, Business Award Communicated Formally Followed by a Transparent Contract Always Go a Long Way to Bank the Benefits of the Sourcing Process.",
            introduction: JSON.stringify([
              "Communication of Business Award to the most suited supplier(s) is considered the important step to not only build rapport but also cement the business relationship that is committed both ways",
              "A formal contract then clearly defines the covenants on both sides to leave nothing to interpretation thus further strengthening the partnership that more often than not generates a win-win situation in mid to long term",
              "Contract brings up the positions both sides are expected to take in cases of dispute or disagreements. Finally, the contract also helps in driving compliances and serves well to qualify in the internal/external financial/statutory audits",
              "This chapter shall make you learn about the importance and merits of concluding a Sourcing Project with a Business Award followed by execution of a Contract",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The importance of clear communication on the Award of Business and Next Steps",
              "How to keep the supplier(s) engaged and involved not to lose the interest and excitement",
              "The importance of concluding the Sourcing Project through the execution of a Contract and/or Agreement with clearly enunciated terms and conditions",
              "How to drive compliance and savings through a contract and score points conforming to the audits",
              "Finally, we shall touch upon the types of contracts along with their brief definitions",
            ]),
          },
          {
            number: 12,
            price: 99,
            category: "CHAPTER",
            title: "Supplier Performance Management",
            imageUrl: "/images/ch/Chapter_12.png",
            heading: "- Supplier Performance Management (SPM) Is Way Beyond the Ratings on Quality, Cost, and Delivery Only and Covers a 360-Degree View to Rate Performance",
            introduction: JSON.stringify([
              "Supplier Performance Management (SPM) is one of the most important aspects of any Purchasing and/or Supply Chain function. Suppliers not only enrich your repute but also impact your cash flow through various indices that we shall discuss and learn during this course",
              "SPM enables organizations to segment their supplier base into strategic, preferred, approved, or potential suppliers to assign qualitative ratings. These quality ratings read in conjunction with their offered price determine the basis of award of business. Suppliers under watch or waiting to get blacklisted also get derived from such performance evaluation",
              "SPM helps organizations to constantly churn their supply base based on a 360-degree view of supplier performance, and this churn helps them to keep ahead of the curve in terms of working with the most efficient and trustworthy suppliers",
              "This Chapter shall touch base all those parameters that are important in evaluating a supplier’s performance and we shall try to develop a structured approach to appoint a performance score to the supplier based on their performance against the above said identified parameters",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "The important parameters that need to be monitored periodically to evaluate a supplier’s performance",
              "How to calculate a score for all such parameters and arrive at a consolidated score that can reflect overall performance of the supplier",
              "How these performance scores can be used to churn the low-performing suppliers and classify high-performing ones into preferred, approved or potential suppliers to bid for your future requirements",
              "How the performance scores can be used to reward best performing suppliers in annual suppliers’ meet and keep a healthy competition among the suppliers to outperform each other and earn the prestige in the hall of fame",
            ]),
          },
          {
            number: 13,
            price: 99,
            category: "CHAPTER",
            title: "Inventory Management",
            imageUrl: "/images/ch/Chapter_13.png",
            heading: "Understanding the Methodology and Importance",
            introduction: JSON.stringify([
              "Inventory Management refers to the process of ordering, storing, and using purchased and finished products",
              "The subject assumes importance for a buyer to optimize inventories and balance the risks of -",
              "Stock-outs and",
              "Locked working capital in the form of payables for the goods purchased and waiting to get used",
              "To achieve these balances, firms have been using the concepts like JIT, KANBAN, MRP planning and Synchro-ordering",
              "This Chapter shall help you understand the importance of inventory optimization; We shall also cover a few important definitions like inventory turns, re-order points, safety stocks, pack-size and MOQ and discuss the concepts of JIT and Synchro-ordering",
            ]),
            goalsTitle: "Our Journey : By the end of the chapter, you would know…",
            goals: JSON.stringify([
              "Why inventory management is one of the key performance indicators for a buyer",
              "How inventories hide the imperfections thereby putting pressure on working capital through locked payables and obsolescence",
              "About the important terms associated with inventory management",
              "The ordering and storage methods to optimize inventory, the 80:20 principle and classification of products that help in controlling inventories",
              "The concepts of MRP, JIT, KANBAN and Synchro-ordering, all aimed at reducing inventory carrying costs that could be the most important KRA for a buyer to keep a check on",
            ]),
          },
          ]
        },
      },
    },
  });
  const book_two = await prisma.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Fundamentals of Sourcing & Procurement - Part 2',
      titleSlug: 'fundamentals-of-sourcing-and-procurement-part-two',
      description: `Part 2 of the book covers more advance procurement topics like Sourcing Strategies, Category Management, Cognitive Buying and Digital Procurement and it also touches a few general but extremely important topics like Sustainability and Change Management
      If you are in middle management role and want to gallop fast to the senior levels, do not miss out on Part 2. I can almost certainly claim that it would add immense value to your knowledge and skills.
      Please soak yourself in the colour of my QTs (Cuties) as another unique feature added after every two chapters to give you a little extra as bonus. Finally, do not miss out on the Appendix Section given at the end of Part 2, that would bring more comprehensive coverage to make the recipe of Procurement more pleasing to the palette.
      Happy Learning !!!`,
      thumbUrl: "[\"/images/book_part2.png\", \"/images/book_part_2_1.png\"]",
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: 5,
      priceDigital: 920,
      priceHardCopy: 1150,
      authorId: author.id,
      links : {
        createMany: {
          data: [{
            link:  "books/Book_2.zip"
              }]
        }
      },
      Chapter: {
        createMany: {
          data:   [
            {
              number:  14,
              price: 99,
              category: "CHAPTER",
              title: "Sourcing Levers & Sourcing Strategies",
              imageUrl: "/images/ch/Chapter_14.png",
              heading: "...A cutting-edge understanding to achieve Cost Saving Objectives",
              introduction: JSON.stringify([
                "Sourcing is a complex process, and the objectives to undertake a sourcing activity may vary. With varying objectives, it is extremely important to select sourcing levers most suited to achieve the objective.",
                "Selection of Sourcing Levers and Adopting a Sourcing Strategy based on objectives and market conditions, in order to optimize the outcome always remains a focus area for any efficient procurement executive.",
                "This Chapter shall bring up the various Sourcing Levers as well as Strategies that need to be applied, and the journey would add immense knowledge and cutting edge to your competency and career growth in the Procurement domain.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "Some of the objectives other than cost saving that necessitate a sourcing intervention",
                "Important Sourcing Levers that can be used to achieve the sourcing objectives",
                "The common Sourcing Strategies that find application in different market conditions",
                "The Sourcing Strategies that can be gainfully applied using a 2 by 2 matrix, plotting the key market conditions on the two axes",
              ]),
            },
            {
              number:  15,
              price: 99,
              category: "CHAPTER",
              title: "Auction Strategies and Preparations",
              imageUrl: "/images/ch/Chapter_15.png",
              heading: "…eSourcing, Auction Strategies and Preparation Guidelines for a Successful e-negotiation - A proven methodology gaining adoption as a highly compliant, time-saving and efficient way to price discovery through online competition",
              introduction: JSON.stringify([
                "eSourcing is the most efficient, transparent, and simpler way to negotiate; It has gained popularity, precedence, and momentum in the last decade.",
                "eRFx and Auctions enable benefits to be leveraged from most spend categories. High-value, low-risk products or services offer an ideal starting point.",
                "It is a Strategic Tool, enabling electronic bidding held in a secure environment, allowing a buyer to simultaneously engage qualified suppliers to place bids in an interactive real-time environment, creating a more efficient marketplace and shortening the sourcing cycle time.",
                "This Chapter shall explain the various auction strategies, factors governing those strategies, and also touch-base on important preparations before the auction day to de-risk the successful outcome.",
                "It shall also address certain myths around auctions that limit their usage and acceptability in general.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "What are the benefits of e-sourcing and what are the different auction strategies available in the marketplace?",
                "How to appropriately use different auction strategies to reap maximum benefits",
                "How e-auctions support the goal of strategic sourcing to significantly reduce the cost of purchases without sacrificing quality and service",
                "About some do’s and don’ts for a successful online negotiation",
                "The important preparations before the auction to de-risk the success",
                "And finally, about certain myths around auctions that limit their usage and acceptability in general.",
              ]),
            },
            {
              number:  16,
              price: 99,
              category: "CHAPTER",
              title: "Execution Excellence, 6 -Sigma/ DMAIC",
              imageUrl: "/images/ch/Chapter_16.png",
              heading: "",
              introduction: JSON.stringify([
                "You might be wondering how a chapter on Execution Excellence finds its place in a book that talks about Sourcing and Procurement. Well, the process/policy adherence requires the efforts in Sourcing and Procurement as well, and often, it is the deviation from the process that leads to unsatisfactory outcomes.",
                "Like any other project requiring diligence in problem-solving, a Sourcing Project also needs the tools that drive Execution Excellence. Here too, there is no room for shortcuts, and efficient planning and execution are the non-negotiable prerequisites for a favorable result.",
                "You will find many examples and case studies both in nature and corporates that are the hallmark of Execution Excellence.",
                "This Chapter shall also touch upon the Lean Six Sigma principles and explain the DMAIC (Define, Measure, Analyze, Improve and Control) process in conclusion to the topic.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "A few mind-blowing examples of Execution Excellence in nature along with a few live example case studies that won accolades by virtue of their being flawless",
                "Execution Excellence and its prerequisites",
                "What entails a typical Process and what we mean by Process Orientation",
                "The Lean, VSM, and Six Sigma Principles while going through a DMAIC process and a Deep-Dive to understand what happens in each of the DMAIC phases",
              ]),
            },
            {
              number:  17,
              price: 99,
              category: "CHAPTER",
              title: "Procurement Policy, Workflow and Authorization Matrix",
              imageUrl: "/images/ch/Chapter_17.png",
              heading: "",
              introduction: JSON.stringify([
                "A well-drafted Procurement Policy with buy-in from all the key business heads is always recommended for the efficient functioning of every organization, in general, and a manufacturing organization, in particular.",
                "The procurement process is usually governed by an approval matrix judiciously built taking spend thresholds and category criticality into account.",
                "Such an approval matrix for every function works most efficiently if implemented through an online platform providing a user-friendly workflow with minimal involvement of paperwork and/or physical presence.",
                "This Chapter shall discuss the features and importance of a Procurement policy along with the governance around the same to ensure organization-wide compliance.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "What a Procurement Policy entails and why it is necessary?",
                "How to fix the spend thresholds and what factors are kept in mind while assigning the approval authorities?",
                "What are the common workflow tools that can help in moving the procurement requisitions online for necessary approvals through the hierarchy?",
                "The audit check-points and common deviations one should guard against to avoid non-compliances and non-conformities during an audit",
              ]),
            },
            {
              number:  18,
              price: 99,
              category: "CHAPTER",
              title: "KPIs and KRAs of Procurement Function",
              imageUrl: "/images/ch/Chapter_18.png",
              heading: "",
              introduction: JSON.stringify([
                "Key Performance Indicators (KPIs) and Key Result Areas (KRAs) are commonly specified by progressive organizations right at the beginning of the annual appraisal cycle to give the individual adequate time to prove their performance and potential against the set goals.",
                "The procurement team is no exception, and it helps in rating the performance against the KPIs and KRAs if such KPIs/KRAs are defined objectively through a defined formula and/or mechanism, leaving almost nothing to ambiguity and/or bias.",
                "This Chapter shall bring out the most commonly used KPIs and KRAs in a Procurement Function along with their calculation mechanisms and/or formulae.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "About the most commonly tracked KPIs and KRAs of a Procurement Function",
                "How these KPIs and KRAs are measured to award a rating to the appraisee?",
                "Brief discussion of the most critical ones that are keenly monitored by Finance and the Board",
              ]),
            },
            {
              number:  19,
              price: 99,
              category: "CHAPTER",
              title: "Category Research and Category Knowledge Management",
              imageUrl: "/images/ch/Chapter_19.png",
              heading: "...to Create a Strategy Review Document (SRD)",
              introduction: JSON.stringify([
                "Category Research and Category Management go a long way to assist Procurement Managers in building a Purchase Strategy for the short and long term and achieve the best outcome within the boundaries of supply geography, supply market, supply constraints, and implementation challenges.",
                "The expertise is achieved through several hours of study and research every now and then to keep oneself updated about the latest supply dynamics. With the world changing so swiftly, the category managers need to always be on their toes to acquire the knowledge, the data, and pre-empt the future trends around the sourcing categories to help take informed decisions and direction.",
                "Predictive technical analysis helps Procurement Managers to hedge their procurement risks in a futuristic market place thus shielding the organization from disruptive and unpredictable markets.",
                "The Purchase Category can be influenced by several parameters and in this Chapter, we shall study some of the above parameters to get the cutting edge in our purchasing decisions.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "An overview of Direct and Indirect categories",
                "Classification of Significant Categories along with their Relevance to the Industry-types",
                "What is Category Management and How it helps in the Best Purchasing Outcomes?",
                "What are the key parameters that can influence a Category from a Sourcing standpoint?",
              ]),
            },
            {
              number:  20,
              price: 99,
              category: "CHAPTER",
              title: "Master Data Management – Item Master with Dictionary Overview, Vendor Master & Maintenance",
              imageUrl: "/images/ch/Chapter_20.png",
              heading: "",
              introduction: JSON.stringify([
                "Item Master Creation and Maintenance assume prime importance for any Master Data Management function.",
                "Same stands for Vendor Masters to have information that is accurate and adequate with respect to regularly transacting suppliers.",
                "Organizations struggle to define Item Master Attributes in the absence of a Standard Operating Procedure. The anomalies in the input data result in bad data in the system that has a far-reaching effect in terms of erroneous MRP, MIS reports, and Dashboards.",
                "Cleansing and Classification, therefore, becomes a periodic Master Data Management exercise while analysts drive change through continuous communication and extensive training to the users having access to these Masters.",
                "This Chapter shall take you through a journey from point A to point B, and after completion, you would have a good understanding of The Essentials of Creating and Maintaining the Item and Vendor Masters.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "The important attributes of a purchased item in the ERP system",
                "Important considerations while defining these attributes",
                "The common anomalies in an item master leading to bad data",
                "The important steps of Cleansing and Classifying the Item Master",
                "How to maintain the item master through adequate training, communication, and governance",
                "A short note on the service codes and their importance",
                "Guide to Create and Maintain the Supplier Masters",
                "How the bad Supplier Master Data can lead to irreparable/costly errors in sourcing, supplies, payments, reconciliation, and audit compliances?",
              ]),
            },
            {
              number:  21,
              price: 99,
              category: "CHAPTER",
              title: "Responsible Procurement : Procurement Ethics, Circular Economy, ESG, Sustainability Mandates, BRSR",
              imageUrl: "/images/ch/Chapter_21.png",
              heading: "",
              introduction: JSON.stringify([
                "Procurement Ethics is a very hot and relevant topic that always needs a mention in any guide related to Procurement. The need assumes significance due to the commercial aspects involved, and clean Procurement is desired at all levels to maintain the repute of any customer-facing organization.",
                "Besides Integrity and Anti-bribery clauses binding a Procurement Professional, there are added aspects of Business Responsibility and Sustainability that are gaining vitality to make a visible mark on furthering Circular Economy, Net-zero Emissions, and Lowering of Carbon Footprint.",
                "Environment Social and Governance (ESG) framework is gaining a lot of focus in forward-looking Corporate World, Global Governing Bodies, and Governments of Nations in every Continent. SEBI (Security and Exchange Board of India) along with other statutory bodies in India are instrumental in mandating some of the provisions to pace up the SDGs.",
                "This Chapter shall attempt to bring out the Sustainability Flavor within the Procurement ambit. The future looks bright and promising as the CSR budgets of corporates are getting impetus to support their SDGs.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "About the General Ethics of a Procurement Manager or Buyer in any organization just as a refresher",
                "What is Circular Economy and How it is gaining traction both at the global level as well as in India? How Net-Zero Emissions is driving the efficiency in the Circular Chain?",
                "The additional and important attributes to Procurement Strategies to include Environment in your stark focus",
                "The terms 3-R, SDG, EPR, ESG, GRS, OBP, BRSR",
                "SEBI’s progressive mandates to submit BRSR in general and, specific to a Plastic Packaging Industry",
                "About a few agencies and links that can help you learn and achieve the requirements of the mandates",
              ]),
            },
            {
              number:  22,
              price: 99,
              category: "CHAPTER",
              title: "Change Management",
              imageUrl: "/images/ch/Chapter_22.png",
              heading: "- Science of Managing Change As A Complex Transition Project Involving Human Behavior That Is Naturally Attuned to Resist",
              introduction: JSON.stringify([
                "Change Management is the process to manage and control the people-side of change to reach the goal and reap the benefits of new ways of working introduced by a smaller group of leaders who want to achieve and positively influence the performance metrics.",
                "The concept is highly relevant in today’s dynamic environment when the world around us is changing so swiftly that if we do not respond in a timely manner, there is a high possibility of losing out to the competition.",
                "We shall go through the common and greatest Change Management Obstacles to reflect upon and prepare in advance for success.",
                "This Chapter shall take you through the Change Journey focused on achieving the Business Outcome through the effective management of people and process.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "Why change is the only constant phenomenon cutting across industry and geographical boundaries",
                "About the potential change management obstacles to guard against",
                "How to set up the team with properly defined roles and responsibilities and how to allocate resources to adequately drive the change",
                "How to measure the Change Management Effectiveness through the transition and implementation stage",
                "About some simple Tools and Techniques to manage the people-side of change to achieve the required business objectives",
                "The Transition Toll Gates - the Milestones of managing change with an objective of doing it first time right",
                "What could be the KRAs for a Change Ambassador?",
              ]),
            },
            {
              number:  23,
              price: 99,
              category: "CHAPTER",
              title: "Cognitive Buying and Digital Procurement, RPA",
              imageUrl: "/images/ch/Chapter_23.png",
              heading: "",
              introduction: JSON.stringify([
                "Cognitive Buying is being adopted by most of the modern-thinking organizations as a smarter approach to procurement.",
                "The Cognitive Buying Tools (CBTs) simplify the user experience so people don’t have to keep track of complex procurement policies and systems.",
                "It delivers the outcomes your stakeholders care about; quickness, accuracy, compliance all-included.",
                "Automating the process with standard templates, triaging rules/workflows, and logical sequencing has revolutionized the end-to-end procurement process to enable decision-making, bringing the procurement intelligence, process adherence, mistake-proofing, and customer satisfaction.",
                "This Chapter shall take you through the Concept and its Applications in enabling, adopting, and strengthening the Digital Procurement.",
              ]),
              goalsTitle: "Our Journey : By the end of the chapter, you would know…",
              goals: JSON.stringify([
                "What is the need of Cognitive Buying and how it can be applied to simplify various procurement processes as explained by Genpact through its Cognitive Buying Assistant (CBA)",
                "How Machine Learning and Artificial Intelligence have influenced almost everyone and Procurement is no exception.",
                "The types of Procurement AI with a reference to ML (Machine Learning), NLP (Natural Language Processing), and RPA (Robotic Process Automation). A brief overview to understand the regenerative AI with recent examples of ChatSonic and ChatGPT",
                "Top 10 Generative AI platforms in procurement",
                "A few limitations of AI and the mitigating work-arounds/suggestions",
              ]),
            },
          ]
        },
      },
    },
  })

  const chapterLinks = await prisma.links.createMany( 
    {
      data: [
        {
          link:  "books/Chapter_0.zip",
          chapterNumber: 0,
        },
        {
          link:  "books/Chapter_1.zip",
          chapterNumber: 1,
        },
        {
          link:  "books/Chapter_2.zip",
          chapterNumber: 2,
        },
        {
          link:  "books/Chapter_3.zip",
          chapterNumber: 3,
        },
        {
          link:  "books/Chapter_4.zip",
          chapterNumber: 4,
        },
        {
          link:  "books/Chapter_5.zip",
          chapterNumber: 5,
        },
        {
          link:  "books/Chapter_6.zip",
          chapterNumber: 6,
        },
        {
          link:  "books/Chapter_7.zip",
          chapterNumber: 7,
        },
        {
          link:  "books/Chapter_8.zip",
          chapterNumber: 8,
        },
        {
          link:  "books/Chapter_9.zip",
          chapterNumber: 9,
        },
        {
          link:  "books/Chapter_10.zip",
          chapterNumber: 10,
        },
        {
          link:  "books/Chapter_11.zip",
          chapterNumber: 11,
        },
        {
          link:  "books/Chapter_12.zip",
          chapterNumber: 12,
        },
        {
          link:  "books/Chapter_13.zip",
          chapterNumber: 13,
        },
        {
          link: "books/Chapter_14.zip",
          chapterNumber: 14,
        },
        {
          link:  "books/Chapter_15.zip",
          chapterNumber: 15,
        },
        {
          link:  "books/Chapter_16.zip",
          chapterNumber: 16,
        },
        {
          link:  "books/Chapter_17.zip",
          chapterNumber: 17,
        },   {
          link:  "books/Chapter_18.zip",
          chapterNumber: 18,
        },
        {
          link:  "books/Chapter_19.zip",
          chapterNumber: 19,
        },
        {
          link:  "books/Chapter_20.zip",
          chapterNumber: 20,
        },
        {
          link:  "books/Chapter_21.zip",
          chapterNumber: 21,
          
        },
           {
          link:  "books/Chapter_22.zip",
          chapterNumber: 22,
        },
        {
          link:   "books/Chapter_23.zip",
          chapterNumber: 23,
        },
      ],
    }
  
  );
   
  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  