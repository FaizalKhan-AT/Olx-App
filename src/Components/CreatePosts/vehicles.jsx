import React from 'react';


function Vehicles () {
	let item = [
		'Commercial & Other Vehicles','Spare Parts'
	]
	let vehicle = [
		'Auto-rickshaws & E-rickshaws','Buses','Trucks',
		'Heavy Machinery','Modified Jeeps','Pick-up vans / Pick-up trucks',
		'Scrap Cars','Taxi Cabs','Tractors','Others'
	]
	return (
		<div className='create-ad-vehicle-container'>
			<div className='create-ad-vehicle-type'>
				<label >Item Type *</label>
				<span  className='down-icon-select-vehicle'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              >
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
		            </svg>
				</span>
				<select id='create-ad-vehicle-select' data-vehicleitem required>
						<option disabled selected></option>
						{ 
							item.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
			<div className='create-ad-vehicle-type'>
				<label >Vehicle Type *</label>
				<span  className='down-icon-select-vehicle'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              >
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
		            </svg>
				</span>
				<select id='create-ad-vehicle-select' data-vehicletype required>
						<option disabled selected></option>
						{ 
							vehicle.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
			<label>Year *</label>
			<div className="create-ad-vehicle-year">
				<input type='text' className='create-ad-set-year' data-vehicleyear id='create-ad-set-year' required/>
			</div>
			<label>KM driven *</label>
			<div className="create-ad-vehicle-driven">
				<input type='text' className='create-ad-set-driven' data-vehicledriven id='create-ad-set-driven'/>
			</div>
		</div>
	)
}
export default Vehicles;
