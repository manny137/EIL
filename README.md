# Employee Management System (JS Stack)

A full-stack Employee Management System (EMS) built during industrial training at Engineers India Limited (EIL).
The system digitalizes employee onboarding, document verification, HR approvals, leave management, and secure role-based dashboards using a modern JavaScript stack.


# 🚀 Features

🔐 Authentication & Security
	•	Secure login using JWT
	•	Password hashing with bcryptjs
	•	Protected routes for HR & Employee roles

👥 Role-Based Dashboards

Employee Dashboard
	•	Apply for leave
	•	View leave history
	•	Update profile & bank details
	•	Upload Aadhaar & PAN documents

HR Dashboard
	•	View and approve pending employee registrations
	•	Access employee bank details
	•	Monitor leave applications
	•	Preview uploaded documents before approval

📩 Automated Onboarding
	•	On HR approval, official login credentials are auto-generated
	•	Email sent to employee using Nodemailer

📁 Document Management
	•	Secure Aadhaar & PAN uploads using Multer
	•	Stored under /uploads/<empId> using a separate file server

🗄️ Database Integration
	•	Built using Neon PostgreSQL
	•	Strict schema via Drizzle ORM
	•	Tables include:
	•	tentative_employees
	•	employee
	•	hr
	•	user_login
	•	bank_details
	•	leave_applications

# 🏗️ Tech Stack

Frontend
	•	React.js
	•	React Router DOM
	•	Tailwind CSS
	•	Axios / Fetch API
	•	React Hook Form / Formik

Backend
	•	Node.js
	•	Express.js
	•	Multer
	•	Nodemailer
	•	bcryptjs
	•	jsonwebtoken (JWT)

Database
	•	Neon PostgreSQL (Cloud SQL)
	•	Drizzle ORM

Dev Tools
	•	VS Code
	•	Postman
	•	Git & GitHub


# 📚 System Architecture & Flow

🔄 Data Relationships

(from page 12 of the report  ￼)
	•	user_login ↔ employee/hr → One-to-One
	•	tentative_employees → employee → One-to-One
	•	employee → leave_applications → One-to-Many
	•	employee → bank_details → One-to-One
	•	employee/hr → file_uploads → One-to-One

🧩 Flow Overview
	1.	Employee registers + uploads Aadhaar/PAN
	2.	HR logs in and verifies documents
	3.	HR approves or rejects
	4.	On approval → System generates credentials + emails them
	5.	Employee logs in using new credentials
	6.	Employee can update profile, bank details, apply for leave


# 🔌 Project Setup

1. Clone the Repository
```
git clone https://github.com/manny137/EIL.git
cd EIL

```

2. Install Dependencies

Backend
```
cd backend
npm install
```
File Server
```
cd file-server
npm install
```
Frontend
```
cd frontend
npm install
```
3. Environment Variables
```
Create .env files for backend & file server:
```
Backend
```
JWT_SECRET=your_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
DATABASE_URL=postgres_connection_url
```
File Server
```
UPLOAD_DIR=./uploads
```
4. Start the Servers

Backend:
```
npm start
```
File Server:
```
node index.js
```
Frontend:
```
npm run dev
```


# 🧪 Testing

As described in the report (page 13  ￼):
	•	Unit Testing for individual components
	•	Module Testing for dependent units
	•	Integration Testing for combined subsystems
	•	System Testing covering complete workflow



# 💡 Observations

	•	Manual onboarding leads to delays
	•	Credentials sent manually leads to errors
	•	No secure login risks unauthorized access
	•	Unstructured document handling complicates verification
	•	HR workflows lack automation



✔️ Recommendations
	•	Deploy to cloud (Vercel + Neon)
	•	Use role-based routing for clarity
	•	Automate onboarding emails
	•	Secure authentication via JWT + bcrypt
	•	Structured document storage
	•	Add bank/leave service forms



# 🔮 Future Enhancements

	•	Cloud deployment
	•	Salary & payroll module
	•	HR analytics dashboard
	•	Mobile optimization
	•	Super-admin panel
	•	Document versioning
	•	Notification system (email/SMS)
	•	Two-factor authentication (2FA)



# 🏁 Conclusion

The Employee Management System modernizes HR operations by automating onboarding, approvals, document verification, and leave processing.
It provides secure role-based workflows, enhances efficiency, reduces errors, and lays a scalable foundation for future upgrades.


# 🔗 GitHub Repository

https://github.com/manny137/EIL  ￼

# Visit the website
https://eil-ten.vercel.app/#
