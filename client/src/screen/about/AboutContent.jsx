import React from 'react';
import './aboutcontent.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutContent() {
  const teamMembers = [
    { name: "Michael Doe", title: "Property Specialist", imgUrl: "https://scontent-lhr6-1.xx.fbcdn.net/v/t1.6435-9/44166167_2185564775064834_339515532661227520_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7a1959&_nc_ohc=bLoS1-GyVJEAX9Wymve&_nc_ht=scontent-lhr6-1.xx&oh=00_AfDbATSu-4uHTkhWI8nZO9QJgO9JJLdtGPmjiKCLsaeCJA&oe=65AECB35", description: "You can relay on our amazing features list and also our customer services will be great experience" },
    { name: "Michael Doe", title: "Property Specialist", imgUrl: "https://scontent-lhr6-1.xx.fbcdn.net/v/t1.6435-9/44166167_2185564775064834_339515532661227520_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7a1959&_nc_ohc=bLoS1-GyVJEAX9Wymve&_nc_ht=scontent-lhr6-1.xx&oh=00_AfDbATSu-4uHTkhWI8nZO9QJgO9JJLdtGPmjiKCLsaeCJA&oe=65AECB35", description: "You can relay on our amazing features list and also our customer services will be great experience" },
    { name: "Michael Doe", title: "Property Specialist", imgUrl: "https://scontent-lhr6-1.xx.fbcdn.net/v/t1.6435-9/44166167_2185564775064834_339515532661227520_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7a1959&_nc_ohc=bLoS1-GyVJEAX9Wymve&_nc_ht=scontent-lhr6-1.xx&oh=00_AfDbATSu-4uHTkhWI8nZO9QJgO9JJLdtGPmjiKCLsaeCJA&oe=65AECB35", description: "You can relay on our amazing features list and also our customer services will be great experience" },
    { name: "Michael Doe", title: "Property Specialist", imgUrl: "https://scontent-lhr6-1.xx.fbcdn.net/v/t1.6435-9/44166167_2185564775064834_339515532661227520_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=7a1959&_nc_ohc=bLoS1-GyVJEAX9Wymve&_nc_ht=scontent-lhr6-1.xx&oh=00_AfDbATSu-4uHTkhWI8nZO9QJgO9JJLdtGPmjiKCLsaeCJA&oe=65AECB35", description: "You can relay on our amazing features list and also our customer services will be great experience" }

  ];

  return (
    <div className="py-5 team4">
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-7 text-center">
            <h3 className="mb-3">Experienced & Professional Team</h3>
            <h6 className="subtitle">You can relay on our amazing features list and also our customer services will be great experience for you without doubt and in no-time</h6>
          </div>
        </div>
        <div className="row">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-3 mb-4">
              <div className="row">
                <div className="col-md-12">
                  <img src={member.imgUrl} alt={member.name} className="img-fluid rounded-circle" />
                </div>
                <div className="col-md-12 text-center">
                  <div className="pt-2">
                    <h5 className="mt-4 font-weight-medium mb-0">{member.name}</h5>
                    <h6 className="subtitle mb-3">{member.title}</h6>
                    <p>{member.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutContent;
