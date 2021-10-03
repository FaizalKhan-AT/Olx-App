import React from 'react';


function Mobiles () {
	let Brands = [
		'iPhone','Samsung','Mi','Vivo','Oppo','Realme','Asus',
		'BlackBerry','Gionee','Google Pixel','Honor','HTC','Huawei','Infinix','Intex',
		'Karbonn','Lava','Lenovo','LG','Micromax','Motorola','Nokia','One Plus',
		'Other Brands'
	]
	return (
		<div className="create-ad-mobiles-container">
			<label >Type *</label>
			<div className="create-ad-mobile-type">
				<div className='create-ad-mobile-type-choice'>
					<label className='create-ad-mobile-type-btn'>
						<input className='radioBtn' type='radio' value="Mobile" name='mobileType'/>
						<span className='Choice-slider'>Mobile</span>
					</label>
					<label className='create-ad-mobile-type-btn'>
						<input className='radioBtn' type='radio' value="Tablet" name='mobileType'/>
						<span className='Choice-slider'>Tablet</span>
					</label>
				</div>
			</div>
			<div className='create-ad-mobile-brand'>
				<label >Brand *</label>
				<span  className='down-icon-select-mobile'>
					<svg
		                width="24px"
		                height="24px"
		                viewBox="0 0 1024 1024"
		                data-aut-id="icon"				               
		              >
		                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
					</svg>
				</span>
				<select id='create-ad-brand-select'required>
						<option disabled selected></option>
						<optgroup label='Popular Brands'></optgroup>
						{ 
							Brands.map(option => {
								return <option key={option} value={option}>{option}</option>
							})
						}
				</select>
			</div>
		</div>

	)
}
export default Mobiles;