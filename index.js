let logform = document.getElementById("login-form");
const DobInput = document.getElementById('dob');

DobInput.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
        DobInput.setCustomValidity('Please enter a valid date of birth between ages 18 and 55.');
    }
    else{
        DobInput.setCustomValidity('');
    }
});

const getinfo = ()=>{
    let info = localStorage.getItem("user-info");
    if(info){
        info = JSON.parse(info);
    }
    else{
        info = [];
    } 
    return info;
}
let information = getinfo();

const showinfo =()=>{
    const info = getinfo();
    const tableentries = info.map((entry)=>{
        const nameCell = `<td>${entry.n}</td>`;
        const emailCell = `<td>${entry.e}</td>`;
        const passwordCell = `<td>${entry.pas}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.chec}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const tab = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>DOB</th>
            <th>Accepted Terms?</th>
        </tr>${tableentries}
    </table>`;

    let finfo = document.getElementById("user-info");
    finfo.innerHTML = tab;
}
const sform = (event)=>{
    event.preventDefault();
    const n = document.getElementById("name").value; 
    const e = document.getElementById("email").value;
    const pas = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const chec = document.getElementById("acceptTerms").checked;
    const entry = {
        n,
        e,
        pas,
        dob,
        chec
    }
    information.push(entry);
    localStorage.setItem("user-info",JSON.stringify(information));
    showinfo();
}

logform.addEventListener("submit",sform); 

showinfo();
