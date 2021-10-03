export function toMonthYear(date) {
	const monthNames = ["January", "February", "March", "April", "May", "June",
 	 "July", "August", "September", "October", "November", "December"
	];
    let d = new Date(date);
    let result = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    return result;
}
