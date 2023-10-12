import AboutBook from "./book/AboutBook";
import AboutChapters from "./book/AboutChapters";
import AboutAuthor from "./book/AboutAuthor";
import BuyBook from "./book/BuyBook";

function mybook() {

    const Book = {
        id: "book",
        title: "Fundamentals of Sourcing & Procurement - Part 1",
        author: "Ajay Garg",
        category: 'Book',
        price: "1350",
        priceList: {
            digital: "945",
            hardcopy: "1350",
        },
        thumbUrl: ["/images/book_part1_bg.png", "/images/book_part1_2.jpeg"],
        rating: 3,
        description: `The book (Part 1 & Part 2) captures my 28 years of learning and growth in the area of Strategic Sourcing and Supply Chain Management.
        The topics covered and the content assimilated could be extremely valuable to anyone who aspires to make a lasting and rewarding career in the area of Sourcing & Procurement and/or Procurement Operations & SCM.
        You will find every page of the book adding to your knowledge as you progress logically, reading chapter after chapter. You would also find the aesthetics pleasing to the eye as if you are going through a storyline in a presentation style.
        Part 1 of the book especially showcase all that you need from Spend Management, negotiations through Contracting and Inventory Management.
        The uniqueness of the book is evident from the macro-enabled spreadsheets and templates provided along with the chapters to make it more practical to apply in your daily work.`
    }
    const author = {
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
        linkdInUrl: ""
    }
    const chapters = [{
        number: "0",
        price: "0",
        title: "Understanding Procurement as a Value Creation Function",
        imageUrl: "/images/chapter0.png",
        heading: `How many of you think that Procurement is a thankless job? Well, irrespective of what you think, the reality is that it is not. On the contrary it is one of the core functions just like Sales or Manufacturing…`,
        introduction: [`Procurement Function started getting into limelight only in the past about 12-13 years and before that it was not even thought of as a proactive career option. The young graduates used to find themselves doing procurement by virtue of the organization's need and not by the career choice of the individual
        `, `So much so that there were hardly any specialisation courses available for Procurement as a subject to learn and master. The job descriptions were not asking for any special requirements for a Procurement profile and ending up doing procurement was considered as anybody's job while actually it was not
        ` , `This chapter shall draw a lot of focus on the role and importance of Procurement as a Core Function to enable any company to run efficiently and resourcefully. After reading this, I hope that you would gain immense respect for yourself as a Buyer in any organization
        `],
        goalsTitle: "Our Journey : By the end of the chapter, you would know…",
        goals: [`The Core and Non-core functions of an organization through my lens`, `The Importance of Procurement Function and what it does to steer and lubricate the organization's engine`,
            `Roles and Responsibilities of Procurement that go way beyond the cost savings`, ` Procurement as an important face of any organization that talks volumes about the Culture and Professionalism while dealing with Supplier`]

    },
    {
        number: "1",
        price: "99",
        title: "Way to understand Procurement as a Value Creation Myson",
        imageUrl: "/images/chapter0.png",
        heading: `How many of you think that Procurement is a thankless job? Well, irrespective of what you think, the reality is that it is not. On the contrary it is one of the core functions just like Sales or Manufacturing…`,
        introduction: [`Procurement Function started getting into limelight only in the past about 12-13 years and before that it was not even thought of as a proactive career option. The young graduates used to find themselves doing procurement by virtue of the organization's need and not by the career choice of the individual
        `, `So much so that there were hardly any specialisation courses available for Procurement as a subject to learn and master. The job descriptions were not asking for any special requirements for a Procurement profile and ending up doing procurement was considered as anybody's job while actually it was not
        ` , `This chapter shall draw a lot of focus on the role and importance of Procurement as a Core Function to enable any company to run efficiently and resourcefully. After reading this, I hope that you would gain immense respect for yourself as a Buyer in any organization
        `],
        goalsTitle: "Our Money : By the end of the chapter, you would know…",
        goals: [`The Core and Non-core functions of an organization through my lens`, `The Importance of Procurement Function and what it does to steer and lubricate the organization's engine`,
            `Roles and Responsibilities of Procurement that go way beyond the cost savings`, ` Procurement as an important face of any organization that talks volumes about the Culture and Professionalism while dealing with Supplier`]

    }]
    return <>
        <div className="mx-auto flex flex-col justify-center items-center  gap-14  ">
            <BuyBook Book={Book} />
            <AboutBook Descrition={Book.description} />
            <AboutChapters Chapters={chapters} />
            <AboutAuthor Author={author} />
        </div>

    </>
}

export default mybook;