import React from 'react';


function Property() {
	return (
		<div className='create-ad-properties-container'>
			<label >Type *</label>
			<div className="create-ad-properties-type">
				<div className='create-ad-properties-type-choice'>
					<label className='create-ad-properties-type-btn'>
						<input className='radioBtn' type='radio' value="Apartments" name='propType'/>
						<span className='Choice-slider'>Apartments</span>
					</label>
					<label className='create-ad-properties-type-btn'>
						<input className='radioBtn' type='radio' value="Builder Floors" name='propType'/>
						<span className='Choice-slider'>Builder Floors</span>
					</label>
					<label className='create-ad-properties-type-btn'>
						<input className='radioBtn' type='radio' value="Farm Houses" name='propType'/>
						<span className='Choice-slider'>Farm Houses</span>
					</label>
					<label className='create-ad-properties-type-btn'>
						<input className='radioBtn' type='radio' value="Houses & Villas" name='propType'/>
						<span className='Choice-slider'>Houses & Villas</span>
					</label>
				</div>
			</div>
			<label >Bedrooms *</label>
			<div className="create-ad-properties-bedrooms">
				<div className='create-ad-properties-bedrooms-choice'>
					<label className='create-ad-properties-bedrooms-btn'>
						<input className='radioBtn' type='radio' value="1" name='propBedrooms'/>
						<span className='Choice-slider'>1</span>
					</label>
					<label className='create-ad-properties-bedrooms-btn'>
						<input className='radioBtn' type='radio' value="2" name='propBedrooms'/>
						<span className='Choice-slider'>2</span>
					</label>
					<label className='create-ad-properties-bedrooms-btn'>
						<input className='radioBtn' type='radio' value="3" name='propBedrooms'/>
						<span className='Choice-slider'>3</span>
					</label>
					<label className='create-ad-properties-bedrooms-btn'>
						<input className='radioBtn' type='radio' value="4" name='propBedrooms'/>
						<span className='Choice-slider'>4</span>
					</label>
					<label className='create-ad-properties-bedrooms-btn'>
						<input className='radioBtn' type='radio' value="4+" name='propBedrooms'/>
						<span className='Choice-slider'>4+</span>
					</label>
				</div>
			</div>
			<label >Bathrooms *</label>
			<div className="create-ad-properties-bathrooms">
				<div className='create-ad-properties-bathrooms-choice'>
					<label className='create-ad-properties-bathrooms-btn'>
						<input className='radioBtn' type='radio' value="1" name='propBathrooms'/>
						<span className='Choice-slider'>1</span>
					</label>
					<label className='create-ad-properties-bathrooms-btn'>
						<input className='radioBtn' type='radio' value="2" name='propBathrooms'/>
						<span className='Choice-slider'>2</span>
					</label>
					<label className='create-ad-properties-bathrooms-btn'>
						<input className='radioBtn' type='radio' value="3" name='propBathrooms'/>
						<span className='Choice-slider'>3</span>
					</label>
					<label className='create-ad-properties-bathrooms-btn'>
						<input className='radioBtn' type='radio' value="4" name='propBathrooms'/>
						<span className='Choice-slider'>4</span>
					</label>
					<label className='create-ad-properties-bathrooms-btn'>
						<input className='radioBtn' type='radio' value="4+" name='propBathrooms'/>
						<span className='Choice-slider'>4+</span>
					</label>
				</div>
			</div>
			<label >Furnishing *</label>
			<div className="create-ad-properties-furnishing">
				<div className='create-ad-properties-furnishing-choice'>
					<label className='create-ad-properties-furnishing-btn'>
						<input className='radioBtn' type='radio' value="Furnished" name='propFurnishing'/>
						<span className='Choice-slider'>Furnished</span>
					</label>
					<label className='create-ad-properties-furnishing-btn'>
						<input className='radioBtn' type='radio' value="Semi-Furnished" name='propFurnishing'/>
						<span className='Choice-slider'>Semi-Furnished</span>
					</label>
					<label className='create-ad-properties-furnishing-btn'>
						<input className='radioBtn' type='radio' value="Unfurnished" name='propFurnishing'/>
						<span className='Choice-slider'>Unfurnished</span>
					</label>
				</div>
			</div>
			<label >Listed by *</label>
			<div className="create-ad-properties-Listed">
				<div className='create-ad-properties-Listed-choice'>
					<label className='create-ad-properties-Listed-btn'>
						<input className='radioBtn' type='radio' value="Builder" name='propListedby'/>
						<span className='Choice-slider'>Builder</span>
					</label>
					<label className='create-ad-properties-Listed-btn'>
						<input className='radioBtn' type='radio' value="Dealer" name='propListedby'/>
						<span className='Choice-slider'>Dealer</span>
					</label>
					<label className='create-ad-properties-Listed-btn'>
						<input className='radioBtn' type='radio' value="Owner" name='propListedby'/>
						<span className='Choice-slider'>Owner</span>
					</label>
				</div>
			</div>
			<label >Listed For *</label>
			<div className="create-ad-properties-Listed">
				<div className='create-ad-properties-Listed-choice'>
					<label className='create-ad-properties-Listed-btn'>
						<input className='radioBtn' type='radio' value="Rent" name='propListedfor'/>
						<span className='Choice-slider'>Rent</span>
					</label>
					<label className='create-ad-properties-Listed-btn'>
						<input className='radioBtn' type='radio' value="Sale" name='propListedfor'/>
						<span className='Choice-slider'>Sale</span>
					</label>
					<label className='create-ad-properties-Listed-btn'>
						<input className='radioBtn' type='radio' value="Lease" name='propListedfor'/>
						<span className='Choice-slider'>Lease</span>
					</label>
				</div>
			</div>
			<label>Super Builtup area (ft²) *</label>
			<div className="create-ad-prop-area">
				<input type='text' className='create-ad-prop-built-area' data-propbuiltup required/>
			</div>
		</div>
	)
}
export default Property;