import React,{useContext,useEffect,useState} from 'react';
import './Create.css';
import Preloader from "../preLoader/Preloader";
import { fireBaseContext,AuthContext } from '../../store/Contexts';
import {useHistory} from 'react-router-dom';
// import sub components
import Cars from './cars';
import Property from './property';
import Mobiles from './mobile';
import Jobs from './jobs';
import Bikes from './bikes';
import Electronics from './electronics';
import Vehicles from './vehicles';
import Furniture from './furniture';
import Fashion from './fashion';
import Sports from './sports';
import Pets from './pets';
import Services from './services';


function Create () {
	const history = useHistory();
	const { User } = useContext(AuthContext);
	const {firebasedb} = useContext(fireBaseContext);
	const [titleLength,setTitleLength] = useState()
	const [descLength,setDescLength] = useState()
	const [descLengthError,setDescLengthError] = useState(false)
	const [titleLengthError,setTitleLengthError] = useState(false);
	const [cars,setCars] = useState(false);
	const [property,setProperty] = useState(false);
	const [mobiles,setMobiles] = useState(false);
	const [jobs,setJobs] = useState(false);
	const [bikes,setBikes] = useState(false);
	const [electronics,setElectronics] = useState(false);
	const [vehicles,setVehicles] = useState(false);
	const [furniture,setFurniture] = useState(false);
	const [fashion,setFashion] = useState(false);
	const [sports,setSports] = useState(false);
	const [pets,setPets] = useState(false);
	const [services,setServices] = useState(false);
	const [imgFiles, setImgFiles] = useState([]);
	//form input states
	const [carfuel,setCarFuel] = useState();
	const [cargear,setCarGear] = useState();
	const [propertyType,setPropertyType] = useState();
	const [propertyBed,setPropertyBed] = useState();
	const [propertyBath,setPropertyBath] = useState();
	const [propertyFurnishing,setPropertyFurnishing] = useState();
	const [propertyListedby,setPropertyListedby] = useState();
	const [propertyListedfor,setPropertyListedfor] = useState();
	const [mobileType,setMobileType] = useState();
	const [JobSalary,setJobSalary] = useState();
	const [JobPosition,setJobPosition] = useState();
	const [adCategory,setAdCategory] = useState();
	const [adLocation,setAdLocation] = useState();
	const [adCarBrand,setAdCarBrand] = useState();
	const [adMobileBrand,setAdMobileBrand] = useState();
	const [adJobType,setAdJobType] = useState();
	const [adBikeType,setAdBikeType] = useState();
	const [adBikeBrand,setAdBikeBrand] = useState();
	const [adElectronics,setAdElectronics] = useState();
	const [adVehicleItem,setAdVehicleItem] = useState();
	const [adVehicleType,setAdVehicleType] = useState();
	const [adFurniture,setAdFurniture] = useState();
	const [adFashion,setAdFashion] = useState();
	const [adSports,setAdSports] = useState();
	const [adPets,setAdPets] = useState();
	const [adServices,setAdServices] = useState();
	const [adTitleInput,setAdTitleInput] = useState();
	const [adDescInput,setAdDescInput] = useState();
	const [adPriceInput,setAdPriceInput] = useState();
	const [adExactLocationInput,setAdExactLocationInput] = useState();
	const [adPhoneInput,setAdPhoneInput] = useState();
	const [adCarYear,setAdCarYear] = useState();
	const [adCarDriven,setAdCarDriven] = useState();
	const [adPropBuiltup,setAdPropBuiltup] = useState();
	const [adJobSalaryfrom,setAdJobSalaryfrom] = useState();
	const [adJobSalaryto,setAdJobSalaryto] = useState();
	const [adBikeYear,setAdBikeYear] = useState();
	const [adBikeDriven,setAdBikeDriven] = useState();
	const [adVehicleYear,setAdVehicleYear] = useState();
	const [adVehicleDriven,setAdVehicleDriven] = useState();
	const [AllImages,setAllImages] = useState([]);
	// errors,after uploads and progress
	const [progress,setProgress] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
  	const [closeError,setCloseError] = useState(true);
  	const [openProgress,setOpenProgress] = useState(false);
  	const [isImgPresent,setIsImagePresent] = useState(false);

	const Categories = [
		{category:'OLX Autos (Cars)'},
		{category:'Properties'},
		{category:'Mobiles'},
		{category:'Jobs'},
		{category:'Bikes'},
		{category:'Electronics & Appliances'},
		{category:'Commercial Vehicles & Spares'},
		{category:'Furniture'},
		{category:'Fashion'},
		{category:'Books, Sports & Hobbies'},
		{category:'Pets'},
		{category:'Services'}
	];
	const states = [
		'Andaman & Nicobar Islands','Andhra Pradesh','Arunachal Pradesh',
		'Assam','Bihar','Chandigarh','Chhattisgarh','Dadra & Nagar',
		'Daman & Diu','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh',
		'Jammu & Kashmir','Jharkhand','Karnataka','Kerala','Lakshadweep',
		'Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
		'Nagaland','Odisha','Pondicherry','Punjab','Rajasthan','Sikkim',
		'Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttaranchal',
		'West Bengal'
	];

	useEffect(() => {
		LengthChangeInput();
		getFormValues();
		if(!User) {
			history.push('/login') 
		}
		// console.log(basicDetails)
	});	

    let date = new Date();
	// firebase object that's common for all categories;
	const basicDetails = {
    	id:User && User.uid,
    	title:adTitleInput,
		description:adDescInput,
		price:adPriceInput,
		locationExact:adExactLocationInput ? adExactLocationInput : "No Location",
		state:adLocation ? adLocation : "No state",
		phone:adPhoneInput,
		datePosted:date.toDateString(),
		Category:adCategory,
		images:[]
    }

	
   window.onbeforeunload = function() { 
    window.setTimeout(function () { 
        window.location = '/';
    }, 0); 
    window.onbeforeunload = null;}
		
	function customSelectOptions(e) {
    	setAdCategory(e.target.value);
			
		if(e.target.value === 'OLX Autos (Cars)') {
			setCars(true);
			setProperty(false);
			setMobiles(false);
			setJobs(false);
			setBikes(false);
			setVehicles(false);
			setVehicles(false);
			setElectronics(false);
			setFurniture(false);
			setFashion(false);
			setSports(false);
			setPets(false);
			setPets(false);
			setServices(false);
		}else if (e.target.value === 'Properties') {
			setProperty(true)
			setCars(false)
			setMobiles(false)
			setBikes(false)
			setElectronics(false)
			setVehicles(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setServices(false)
			setJobs(false)
		}else if (e.target.value === 'Mobiles') {
			setMobiles(true)
			setCars(false)
			setProperty(false)
			setJobs(false)
			setElectronics(false)
			setVehicles(false)
			setBikes(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setServices(false)		
		}else if (e.target.value === 'Jobs') {
			setJobs(true)
			setCars(false)
			setProperty(false)
			setBikes(false)
			setElectronics(false)
			setVehicles(false)
			setMobiles(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setServices(false)		
		}else if (e.target.value === 'Bikes') {
			setBikes(true)
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setElectronics(false)
			setVehicles(false)
			setJobs(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setServices(false)		
		}else if (e.target.value === 'Electronics & Appliances') {
			setElectronics(true)
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setBikes(false)
			setVehicles(false)
			setJobs(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setServices(false)		
		}else if (e.target.value === 'Commercial Vehicles & Spares') {
			setVehicles(true)
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setJobs(false)
			setElectronics(false)
			setBikes(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setServices(false)		
		}else if (e.target.value === 'Furniture') {
			setFurniture(true)
			setCars(false)
			setMobiles(false)
			setProperty(false)
			setBikes(false)
			setElectronics(false)
			setVehicles(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setServices(false)
			setJobs(false)
		}else if (e.target.value === 'Fashion') {
			setFashion(true)
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setBikes(false)
			setJobs(false)
			setVehicles(false)
			setElectronics(false)
			setFurniture(false)
			setSports(false)
			setPets(false)
			setServices(false)		
		}else if (e.target.value === 'Books, Sports & Hobbies') {
			setSports(true)
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setJobs(false)
			setElectronics(false)
			setVehicles(false)
			setBikes(false)
			setFurniture(false)
			setFashion(false)
			setPets(false)
			setServices(false)		
		}else if (e.target.value === 'Pets') {
			setPets(true)
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setBikes(false)
			setElectronics(false)
			setVehicles(false)
			setJobs(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setServices(false)
		}else if (e.target.value === 'Services') {
			setServices(true)
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setBikes(false)
			setElectronics(false)
			setVehicles(false)
			setJobs(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)			
		}else {
			setCars(false)
			setProperty(false)
			setMobiles(false)
			setBikes(false)
			setElectronics(false)
			setVehicles(false)
			setFurniture(false)
			setFashion(false)
			setSports(false)
			setPets(false)
			setJobs(false)
			setServices(false)
		}	
	}
    function LengthChangeInput() {
	    const adDesc = document.querySelector("#setAdDesc");
	    const adTitle = document.querySelector("#setAdTitle");

	    adDesc.addEventListener('input',(e) => {
	    	setDescLength(e.target.value.length)
	    	if(e.target.value.length > 4096) {
	    		setDescLengthError(true)
	    	}else {
	    		setDescLengthError(false)

	    	}
	    })
	    adTitle.addEventListener('input',(e) => {
	    	setTitleLength(e.target.value.length)
	    	if(e.target.value.length > 70) {
	    		setTitleLengthError(true)
	    		
	    	}else {
	    		setTitleLengthError(false)

	    	}
	    });
    }

  	function ImageUpload () {
		const fileInput = document.querySelector('input[type=file]')
		fileInput.click();
  	}
    function fileInputChanged(e) {
	  	const images = e.target.files;
	  	setAllImages(images)
	  	if(images){
	  		setIsImagePresent(true)
	  		const imageArray = Array.from(images).map(img => URL.createObjectURL(img))
	  		setImgFiles(image => image.concat(imageArray))
	  	}	
    }

    function getFormValues () {
    	// all radio buttons
    	document.querySelectorAll('input[name=carFuel]').forEach(fuel => {
    		fuel.addEventListener('change',(e) => setCarFuel(e.target.value))
    	})
    	document.querySelectorAll('input[name=carGear]').forEach(gear => {
    		gear.addEventListener('change',(e) => setCarGear(e.target.value))
    	})
    	document.querySelectorAll('input[name=propType]').forEach(type => {
    		type.addEventListener('change',(e) => setPropertyType(e.target.value))
    	})
    	document.querySelectorAll('input[name=propBedrooms]').forEach(bedroom => {
    		bedroom.addEventListener('change',(e) => setPropertyBed(e.target.value))
    	})
    	document.querySelectorAll('input[name=propBathrooms]').forEach(bathroom => {
    		bathroom.addEventListener('change',(e) => setPropertyBath(e.target.value))
    	})
    	document.querySelectorAll('input[name=propFurnishing]').forEach(furnishing => {
    		furnishing.addEventListener('change',(e) => setPropertyFurnishing(e.target.value))
    	})
    	document.querySelectorAll('input[name=propListedby]').forEach(listedby => {
    		listedby.addEventListener('change',(e) => setPropertyListedby(e.target.value))
    	})
    	document.querySelectorAll('input[name=propListedfor]').forEach(listedFor => {
    		listedFor.addEventListener('change',(e) => setPropertyListedfor(e.target.value))
    	})
    	document.querySelectorAll('input[name=mobileType]').forEach(mobType => {
    		mobType.addEventListener('change',(e) => setMobileType(e.target.value))
    	})
    	document.querySelectorAll('input[name=jobSalary]').forEach(jobSalary => {
    		jobSalary.addEventListener('change',(e) => setJobSalary(e.target.value))
    	})
    	document.querySelectorAll('input[name=jobPosition]').forEach(jobPosition => {
    		jobPosition.addEventListener('change',(e) => setJobPosition(e.target.value))
    	})
    	
    	// All selects
    	
        cars && document.getElementById('create-ad-car-select').addEventListener('change',(e) => setAdCarBrand(e.target.value));
        mobiles && document.getElementById('create-ad-brand-select').addEventListener('change',(e) => setAdMobileBrand(e.target.value));
        jobs && document.getElementById('create-ad-job-select').addEventListener('change',(e) => setAdJobType(e.target.value));
    	if (bikes) {
    		document.querySelector('select[data-biketype]').addEventListener('change',(e) => setAdBikeType(e.target.value));	
    	    document.querySelector('select[data-bikebrand]').addEventListener('change',(e) => setAdBikeBrand(e.target.value));
    	}
        electronics && document.getElementById('create-ad-elect-select').addEventListener('change',(e) => setAdElectronics(e.target.value));
        if (vehicles) {
    		document.querySelector('select[data-vehicleitem]').addEventListener('change',(e) => setAdVehicleItem(e.target.value));	
    	    document.querySelector('select[data-vehicletype]').addEventListener('change',(e) => setAdVehicleType(e.target.value));
    	}
        furniture && document.getElementById('create-ad-furniture-select').addEventListener('change',(e) => setAdFurniture(e.target.value));
        fashion && document.getElementById('create-ad-fashion-select').addEventListener('change',(e) => setAdFashion(e.target.value));
        sports && document.getElementById('create-ad-sports-select').addEventListener('change',(e) => setAdSports(e.target.value));
        pets && document.getElementById('create-ad-pets-select').addEventListener('change',(e) => setAdPets(e.target.value));
        services && document.getElementById('create-ad-service-select').addEventListener('change',(e) => setAdServices(e.target.value));

        // All text and number inputs
        if (cars) {
			document.querySelector('input[data-caryear]').addEventListener('change',(e) => setAdCarYear(e.target.value));
        	document.querySelector('input[data-cardriven]').addEventListener('change',(e) => setAdCarDriven(e.target.value));
        } 
		property && document.querySelector('input[data-propbuiltup]').addEventListener('change',(e) => setAdPropBuiltup(e.target.value));
        if (jobs) {
			document.querySelector('input[data-jobsalaryfrom]').addEventListener('change',(e) => setAdJobSalaryfrom(e.target.value));
        	document.querySelector('input[data-jobsalaryto]').addEventListener('change',(e) => setAdJobSalaryto(e.target.value));
        } 
		if (bikes) {
			document.querySelector('input[data-bikeyear]').addEventListener('change',(e) => setAdBikeYear(e.target.value));
        	document.querySelector('input[data-bikedriven]').addEventListener('change',(e) => setAdBikeDriven(e.target.value));
        }
        if (vehicles) {
			document.querySelector('input[data-vehicleyear]').addEventListener('change',(e) => setAdVehicleYear(e.target.value));
        	document.querySelector('input[data-vehicledriven]').addEventListener('change',(e) => setAdVehicleDriven(e.target.value));
        }
    }

    function handlePostCreation (e) {
    	e.preventDefault(); 
    	if (!isImgPresent) {
    		alert('You Sholud upload Images its Mandatory');
    		return;
       	}
       	if (!adTitleInput) {
       		alert('You have to provide the basic information about the product you are selling like Title,Category,Price,Description,Image etc.');
    		return;
       	}
    	if (!adDescInput) {
    		alert('You have to provide the basic information about the product you are selling like Title,Category,Price,Description,Image etc.');
    		return;
    	}
    	if (!adPriceInput) {
    		alert('You have to Enter the Price of the Product');
    		return;
    	}
    	if(!adCategory) {
    		alert('You have to provide the basic information about the product you are selling like Title,Category,Price,Description,Image etc.');
    		return;
    	}
    	if (!adPhoneInput) {
    		alert('Enter Your Mobile number')
    		return;
    	}
    	setOpenProgress(true);
    	setLoading(true);
    	let imageUpload;

    	for (var i = 0; i < AllImages.length; i++ ) {
    		imageUpload = firebasedb.storage().ref(`post-images/${AllImages[i].name}`).put(AllImages[i]);
    	}
    	
    	imageUpload.on("state_changed",(snapshot) => {
   			setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
    	},
    	(error) => {
    		setError(error.message)
    		setCloseError(true)
    	},
    	() => {
      		let task;
      		for(var i = 0; i < AllImages.length; i++) {
    			task = firebasedb.storage().ref().child(`post-images/${AllImages[i].name}`).getDownloadURL().then((downloadURLs) => {
			    basicDetails.images.push(downloadURLs)
    			setOpenProgress(false); 
			}).catch((error) => {
	    		setError(error.message)
	    		setCloseError(true)
			})
    		}
    		task.then(() => {	
					if (cars) {
			    		firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			carFuel:carfuel ? carfuel: "No Fuel",
							carGear:cargear ? cargear: "No Gear",
							carBrand:adCarBrand ? adCarBrand: "No brand",
							year:adCarYear ? adCarYear: "No Year",
							driven:adCarDriven ? adCarDriven: "No km driven",
			    		}).then(() => {
		    					setLoading(false);
		    					history.push('/');	
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (property) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:propertyType ? propertyType : 'No type',
							propertyBed:propertyBed ? propertyBed : 'No bedrooms',
							propertyBath:propertyBath ? propertyBath : 'No bathrooms',
							propertyFurnishing:propertyFurnishing ? propertyFurnishing : 'No furnishing',
							propertyListedby:propertyListedby ? propertyListedby : 'No listed by',
							propertyListedfor:propertyListedfor ? propertyListedfor : 'No listed for',
							squarefeet:adPropBuiltup ? adPropBuiltup : 'No squarefeet'
			    		}).then(() => {			    					    				
		    					setLoading(false);
		    					history.push('/');			    						    		
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})    		
			    	}else if (mobiles) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:mobileType ? mobileType : "No type",
							MobileBrand:adMobileBrand ? adMobileBrand : "No brand"
			    		}).then(() => {
		    					setLoading(false);
		    					history.push('/');	    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (jobs) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			salaryPeriod:JobSalary ? JobSalary : "No salaryPeriod",
							JobPosition:JobPosition ? JobPosition : "No postiton",
							type:adJobType ? adJobType : "No type",
							Salaryfrom:adJobSalaryfrom ? adJobSalaryfrom : "No Salaryfrom",
							Salaryto:adJobSalaryto ? adJobSalaryto : "No Salaryto"
			    		}).then(() => {	
		    					setLoading(false);
		    					history.push('/');		    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (bikes) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:adBikeType ? adBikeType : 'No Type',
							BikeBrand:adBikeBrand ? adBikeBrand : 'No brand',
							year:adBikeYear ? adBikeYear : 'No year',
							driven:adBikeDriven ? adBikeDriven : 'No km driven'
			    		}).then(() => {		
		    					setLoading(false);
		    					history.push('/');	    		
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (electronics) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:adElectronics ? adElectronics : 'No type'
			    		}).then(() => {			
		    					setLoading(false);
		    					history.push('/');			    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (vehicles) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			VehicleItem:adVehicleItem ? adVehicleItem : 'No Itemtype',
							type:adVehicleType ? adVehicleType : 'No type',
							year:adVehicleYear ? adVehicleYear : 'No year',
							driven:adVehicleDriven ? adVehicleDriven : 'No km driven'
			    		}).then(() => {			
		    					setLoading(false);
		    					history.push('/');	    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (furniture) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:adFurniture ? adFurniture : "No type"
			    		}).then(() => {			
		    					setLoading(false);
		    					history.push('/');			    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (fashion) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			fashionFor:adFashion ? adFashion : 'No fashionFor'
			    		}).then(() => {			
		    					setLoading(false);
		    					history.push('/');			    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (sports) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:adSports ? adSports : 'No type'
			    		}).then(() => {			
		    					setLoading(false);
		    					history.push('/');		    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (pets) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:adPets ? adPets : 'No Type'
			    		}).then(() => {			    
		    					setLoading(false);
		    					history.push('/');			    		
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else if (services) {
						firebasedb.firestore().collection('posts').add({
			    			...basicDetails,
			    			type:adServices ? adServices : 'No Type'
			    		}).then(() => {			   
		    					setLoading(false);
		    					history.push('/');	    			
			    		}).catch((error) => {
				    		setError(error.message)
				    		setCloseError(true)
						})
			    	}else {
			    		alert("No Category was selected")
			    		return;
			    	}	
    		})
    	});	
    }	

	return (
		<>
      	{loading && <Preloader sticky/>}
		{error && <div className={closeError ? "update-errors" : 'update-errors update-close'}>
        <button className='close-error' title='Close' onClick={()=>{
          setCloseError(false)
          setLoading(false)
        }}
        >&times;</button>
        {error}
     	</div> }
		{ openProgress &&
			<div className="create-ad-file-upload-progress">
				    <p className='upload-progress-file-text'
					>File Upload Progress: {progress}%</p>
					<div className="upload-progress-file">
						<div className="upload-progress-file-thumb" 
						style={{width:`${progress}%`}}></div>
					</div>
		    </div>
		}
		<div className='create-ad-navbar'>
			<div  title='Go Home' className="logo-ad-navbar" onClick={() => history.push("/")}>
	          <svg
	            width="60px"
	            height="60px"
	            viewBox="0 0 1024 1024"
	            data-aut-id="icon">
	            <path
	              
	              d="M661.333 256v512h-128v-512h128zM277.333 298.667c117.824 0 213.333 95.531 213.333 213.333s-95.509 213.333-213.333 213.333c-117.824 0-213.333-95.531-213.333-213.333s95.509-213.333 213.333-213.333zM794.496 384l37.504 37.504 37.504-37.504h90.496v90.496l-37.504 37.504 37.504 37.504v90.496h-90.496l-37.504-37.504-37.504 37.504h-90.496v-90.496l37.504-37.504-37.504-37.504v-90.496h90.496zM277.333 426.667c-47.061 0-85.333 38.293-85.333 85.333s38.272 85.333 85.333 85.333c47.061 0 85.333-38.293 85.333-85.333s-38.272-85.333-85.333-85.333z"
	            ></path>
	          </svg>
	        </div>
		</div>
		{/*navbar end*/}
		<div className="create-ad-container">
			<div className="create-ad-title">POST YOUR AD</div>
			<div className='create-ad-form-container'>
				<div className='create-ad-form-title'>CHOOSE A CATEGORY</div>
				<form className='create-ad-form'>
					<div className='create-ad-category'> 
						<label className='create-ad-category-title' htmlFor='create-ad-category-select'>
							Select a Category:
						</label>
						<span  className='down-icon-select'>
							<svg
				                width="24px"
				                height="24px"
				                viewBox="0 0 1024 1024"
				                data-aut-id="icon"				               
				              >
				                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
				            </svg>
            			</span>

						<select id='create-ad-category-select' onChange={customSelectOptions} required>
							<option disabled selected>Choose a Category</option>
							{ 
								Categories.map(option => {
									return <option key={option.category} value={option.category}>{option.category}</option>
								})
							}
						</select>
					</div>
						<div className="create-ad-include-title">INCLUDE SOME DETAILS</div>
					{cars && <Cars/>}{property && <Property/>}
					{mobiles && <Mobiles/>}{jobs && <Jobs/>}
					{bikes && <Bikes/>}{electronics && <Electronics/>}
					{vehicles && <Vehicles/>}{furniture && <Furniture/>}
					{fashion && <Fashion/>}{sports && <Sports/>}
					{pets && <Pets/>}{services && <Services/>}
					<div className='create-ad-set-title-desc'>
						<label htmlFor='setAdTitle'>Ad Title *</label>						
						<div className='create-ad-set-title'>
							<input id='setAdTitle' className={titleLengthError ? 'create-ad-set-title-input create-ad-form-input-error' : 'create-ad-set-title-input' } type='text' 
							onChange={(e) => setAdTitleInput(e.target.value)} required/>
							<div className='create-ad-set-title-spans'>
								<span className='create-ad-set-title-sub'>Mention the key features of your item (e.g. brand, model, age, type)</span>
								<span className='create-ad-set-title-length'>{titleLength ? titleLength : 0} / 70</span>
						</div>
						</div>
						<label htmlFor='setAdDesc'>Description *</label>
						<div className='create-ad-set-desc'>
							<textarea id='setAdDesc' className={descLengthError ? 'create-ad-set-desc-input create-ad-form-input-error':'create-ad-set-desc-input'} 
							onChange={(e) => setAdDescInput(e.target.value)} required></textarea>
							<div className='create-ad-set-desc-spans'>
								<span className='create-ad-set-desc-sub'>Include condition, features and reason for selling</span>
								<span className='create-ad-set-desc-length'>{descLength ? descLength : 0} / 4096</span>
							</div>
						</div>
						
					</div>

					<div className='create-ad-set-price'>
						<div className='create-ad-set-price-title'>SET A PRICE</div>
						<div className='create-ad-set-price-input' >
							<span className='create-ad-set-price-input-icon'>&#8377;</span>
							<input id='setAdPrice' type='tel' 
							onChange={(e) => setAdPriceInput(e.target.value)} required/>	
						</div>
					</div>
					<div className="create-ad-file-upload">
						<label>You can select multiple Images. (less than 5 is fine) <span style={{color:"red",}}>* This Field is Mandatory</span></label><br/>
						<input type='file' multiple  hidden onChange={fileInputChanged} required/>
						<button className="create-ad-file-upload-btn" type='button' onClick={ImageUpload}>Upload Images</button>
						<div className="create-ad-files">
							{imgFiles.map ( (imgs,index) => {
								return <img key={index} className='create-ad-file-preview' src={imgs} alt='UploadedPics' />
							})}
						</div>
					</div>

					<div className='create-ad-set-location'>
						<div className='create-ad-set-location-title'>SET YOUR LOCATION</div>
						<div className='create-ad-location'>
							<label >Select State *</label>
							<span  className='down-icon-select-location'>
								<svg
					                width="24px"
					                height="24px"
					                viewBox="0 0 1024 1024"
					                data-aut-id="icon"				               
					              >
					                <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
					            </svg>
							</span>
							<select id='create-ad-location-select' 
							onChange={(e) => setAdLocation(e.target.value)} required>
									<option disabled selected></option>
									{ 
										states.map(option => {
											return <option key={option} value={option}>{option}</option>
										})
									}
							</select>
						</div>
						<label >Enter your Location *</label>
						<div className='create-ad-set-location-input' >
							<input id='setAdExactLocation' type='text' 
							onChange={(e) => setAdExactLocationInput(e.target.value)} required/>	
						</div>
					</div>
					<div className='create-ad-set-phone'>
						<div className='create-ad-set-phone-title'>ENTER YOUR PHONE NUMBER</div>
						<div className='create-ad-set-phone-input' >
							<span className='create-ad-set-phone-input-icon'>+91</span>
							<input id='setAdPhone' type='tel' 
							onChange={(e) => setAdPhoneInput(e.target.value)} required/>	
						</div>
					</div>
					<div className="create-ad-submit">
						<button className="create-ad-submit-btn" type='submit' onClick={handlePostCreation}>Create Post</button>
					</div>
				</form>
			</div>			
		</div>
		{/*footer*/}
		<div className='create-ad-footer'>
			<div>Sitemap</div>
			<div>Free Classifieds in India. © 2006-2021 OLX</div>
		</div>
		</>
	)
}

export default Create;