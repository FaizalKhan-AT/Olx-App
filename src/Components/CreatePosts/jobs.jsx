import React from 'react';

function Jobs () {
	let jobs = [
		'Data entry & Back office','Sales & Marketing','BPO & Telecaller','Driver',
		'Office Assistant','Delivery & Collection','Teacher','Cook',
		'Receptionist & Front office','Operator & Technician','IT Engineer & Developer',
		'Hotel & Travel Executive','Accountant','Designer','Other Jobs'
	]
	return (
		<div className='create-ad-jobs-container'>
		<div className='create-ad-job-type'>
				<label >Job Type *</label>
				<span  className='down-icon-select-job'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              	>
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
					</svg>
				</span>
				<select id='create-ad-job-select'required>
						<option disabled selected></option>
						{ 
							jobs.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
			<label >Salary period *</label>
			<div className="create-ad-job-salary">
				<div className='create-ad-job-salary-choice'>
					<label className='create-ad-job-salary-btn'>
						<input className='radioBtn' type='radio' value="Hourly" name='jobSalary'/>
						<span className='Choice-slider'>Hourly</span>
					</label>
					<label className='create-ad-job-salary-btn'>
						<input className='radioBtn' type='radio' value="Monthly" name='jobSalary'/>
						<span className='Choice-slider'>Monthly</span>
					</label>
					<label className='create-ad-job-salary-btn'>
						<input className='radioBtn' type='radio' value="Weekly" name='jobSalary'/>
						<span className='Choice-slider'>Weekly</span>
					</label>
					<label className='create-ad-job-salary-btn'>
						<input className='radioBtn' type='radio' value="Yearly" name='jobSalary'/>
						<span className='Choice-slider'>Yearly</span>
					</label>
				</div>
				<label >Position type *</label>
				<div className="create-ad-job-position">
					<div className='create-ad-job-position-choice'>
						<label className='create-ad-job-position-btn'>
							<input className='radioBtn' type='radio' value="Contract" name='jobPosition'/>
							<span className='Choice-slider'>Contract</span>
						</label>
						<label className='create-ad-job-position-btn'>
							<input className='radioBtn' type='radio' value="Full-time" name='jobPosition'/>
							<span className='Choice-slider'>Full-time</span>
						</label>
						<label className='create-ad-job-position-btn'>
							<input className='radioBtn' type='radio' value="Part-time" name='jobPosition'/>
							<span className='Choice-slider'>Part-time</span>
						</label>
						<label className='create-ad-job-position-btn'>
							<input className='radioBtn' type='radio' value="Temporary" name='jobPosition'/>
							<span className='Choice-slider'>Temporary</span>
						</label>
					</div>
				</div>
				<label>Salary from *</label>		
				<div className="create-ad-job-salary">
					<input type='text' className='create-ad-job-salary-input' data-jobsalaryfrom required/>
				</div>
				<label>Salary to *</label>						
				<div className="create-ad-job-salary">
					<input type='text' className='create-ad-job-salary-input' data-jobsalaryto required/>
				</div>
			</div>
		</div>
   )
}
export default Jobs;