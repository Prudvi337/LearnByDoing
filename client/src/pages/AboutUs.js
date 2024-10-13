import React, { useState } from "react";
import Footer from '../components/Footer';

export default function Component() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const sections = [
    {
      title: "Our Mission",
      content: "At LearnByDoing, we believe that the best way to master a skill is through hands-on experience. Our mission is to provide an immersive, interactive learning environment where students can apply their knowledge in real-time and learn from their successes and mistakes.",
      image: "/placeholder.svg"
    },
    {
      title: "Our Approach",
      content: "We combine cutting-edge technology with proven educational methodologies to create a unique learning experience. Our platform adapts to each student's pace and style, ensuring that everyone can learn effectively, regardless of their background or previous experience.",
      image: "/placeholder.svg"
    },
    {
      title: "Our Team",
      content: "Our diverse team of educators, technologists, and industry experts work together to create comprehensive, up-to-date curricula. We're passionate about education and committed to helping our students achieve their goals and reach their full potential.",
      image: "/placeholder.svg"
    },
    {
      title: "Our Impact",
      content: "Since our founding, we've helped thousands of students acquire new skills, advance their careers, and pursue their passions. Our alumni network spans the globe, with success stories from various industries and fields.",
      image: "/placeholder.svg"
    }
  ];

  const faqItems = [
    {
      question: "What makes LearnByDoing different from other online learning platforms?",
      answer: "LearnByDoing stands out through our hands-on, project-based approach. Instead of passive lectures, our students learn by actively working on real-world projects, receiving immediate feedback, and iterating on their work. This practical experience accelerates learning and better prepares students for real-world challenges."
    },
    {
      question: "What types of courses does LearnByDoing offer?",
      answer: "We offer a wide range of courses across various disciplines, including software development, data science, design, digital marketing, and more. Our courses are designed to cater to beginners as well as professionals looking to upskill or switch careers."
    },
    {
      question: "How long does it take to complete a course on LearnByDoing?",
      answer: "Course duration varies depending on the complexity of the subject and the pace of the learner. On average, our courses take between 4 to 12 weeks to complete when studying part-time. However, our platform allows for flexible learning, so you can adjust your pace to fit your schedule."
    },
    {
      question: "Do I get a certificate upon completion of a course?",
      answer: "Yes, upon successful completion of a course, you will receive a verified digital certificate. This certificate can be shared on your LinkedIn profile or with potential employers as proof of your newly acquired skills."
    },
    {
      question: "Is there any support available if I get stuck during a course?",
      answer: "We provide multiple layers of support. You'll have access to our community forums where you can discuss with peers, regular office hours with instructors, and the ability to book one-on-one mentoring sessions for more personalized assistance."
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to your server
    console.log("Feedback submitted:", { name, email, feedback });
    alert("Thank you for your feedback!");
    // Reset form fields
    setName("");
    setEmail("");
    setFeedback("");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <div className="container py-5">
          <h1 className="text-center mb-5">About LearnByDoing</h1>
          {sections.map((section, index) => (
            <div key={index} className={`row align-items-center mb-5 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
              <div className="col-md-6 mb-4 mb-md-0">
                <h2 className="mb-3">{section.title}</h2>
                <p className={`${Math.random() > 0.5 ? 'text-start' : 'text-justify'}`}>{section.content}</p>
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <img
                  src={section.image}
                  alt={section.title}
                  className="img-fluid rounded shadow"
                  style={{
                    width: `${Math.floor(Math.random() * (600 - 400 + 1)) + 400}px`,
                    height: `${Math.floor(Math.random() * (400 - 300 + 1)) + 300}px`,
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>
          ))}
          
          <div className="my-5">
            <h2 className="text-center mb-4">Frequently Asked Questions</h2>
            <div className="accordion" id="faqAccordion">
              {faqItems.map((item, index) => (
                <div className="accordion-item" key={index}>
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`}>
                      {item.question}
                    </button>
                  </h3>
                  <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="my-5 bg-light p-4 rounded">
            <h2 className="text-center mb-4">We Value Your Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="feedback" className="form-label">Your Feedback</label>
                <textarea
                  id="feedback"
                  className="form-control"
                  rows="4"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit Feedback</button>
            </form>
          </div>
        </div>
      </main>
<Footer/>
    </div>
  );
}