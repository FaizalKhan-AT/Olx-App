import React from 'react';


function Electronics() {
	let appliances = [
		'TVs, Video - Audio','Kitchen & Other Appliances','Computers & Laptops',
		'Cameras & Lenses','Games & Entertainment','Fridges',
		'Computer Accessories','Hard Disks, Printers & Monitors','ACs',
		'Washing Machine'
	]

	return  (
		<div className='create-ad-elect-container'>
			<div className='create-ad-elect-type'>
				<label >Electronics & Appliances Type *</label>
				<span  className='down-icon-select-elect'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              >
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
		            </svg>
				</span>
				<select id='create-ad-elect-select'required>
						<option disabled selected></option>
						{ 
							appliances.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
		</div>
	)
}
export default Electronics;