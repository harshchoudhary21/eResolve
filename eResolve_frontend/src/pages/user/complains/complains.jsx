import React from 'react';
import './ComplaintForm.css'; // Ensure you have a corresponding CSS file for styling

const ComplaintForm = () => {
  return (
    <div className="complaint-container">
      <h2 className="complaint-heading">Complaint Form</h2>
      <section className="complaint-section">
        <div className="complaint-form-container">
          <form className="complaint-form" action="#">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" className="form-control" placeholder="Your name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" className="form-control" placeholder="Your phone number" required />
            </div>
            <div className="form-group">
              <label htmlFor="complaint-heading">Complaint Heading:</label>
              <input type="text" id="complaint-heading" className="form-control" placeholder="Brief title of your complaint" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input type="text" id="location" className="form-control" placeholder="Complaint location" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea id="description" className="form-control" placeholder="Describe your complaint" rows="4" required />
            </div>
            <div className="form-group">
              <label htmlFor="file">Attach Image:</label>
              <input type="file" id="file" className="form-control-file" />
            </div>
            <button type="submit" className="submit-btn">Submit Complaint</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ComplaintForm;