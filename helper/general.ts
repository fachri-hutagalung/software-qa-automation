export function getFullDate(dateOffset: number = 0,language: string = "en"){
    const MM = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    const MMM = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Aug','Sep','Oct','Nov','Dev'];

    var MMMM = [''];
    if (language == 'en'){
        MMMM = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    }else if(language == 'id'){
        MMMM = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    }


    var date = new Date();
    var dateOnly = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    dateOnly = dateOnly+dateOffset;

    var newMonth = date.setMonth(month,dateOnly)
    var newDate = new Date(newMonth);
    month = newDate.getMonth();
    dateOnly = newDate.getDate();
    year = newDate.getFullYear();

    // console.log('date : '+dateOnly+" | month : "+month+" | "+" year : "+year);

    var fullDate = [dateOnly,MMMM[month],year]
    
    return fullDate;
}

export async function markAsFailed(message: string = 'mark as failed'){
    throw new Error(message);
}