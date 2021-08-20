const employees = [];

function loadEmployeeModule() {
  $.ajax({
    type: "GET",
    url: "modulos/empleado.html",
    async: true,
  }).done(function (data) {
    $("#principalSection").html(data);
    loopEmployees();
  });
}

function saveEmployee() {
  var nameEmployee = document.getElementById("txtNameE").value;
  var ApPEmployee = document.getElementById("txtApPE").value;
  var ApMEmployee = document.getElementById("txtApME").value;
  var genderEmployee = "";
  var gen1 = document.getElementById("rbtGender1").checked;
  var gen2 = document.getElementById("rbtGender2").checked;
  var gen3 = document.getElementById("rbtGender3").checked;

  if (gen1) {
    genderEmployee = "Masculino";
  }
  else if (gen2) { // agregue un else if aqui
    genderEmployee = "Femenino";
  } else {
    genderEmployee = "Otro";
  }

  var RFCEmployee = document.getElementById("txtRFC").value;
  var addressEmployee = document.getElementById("txtAddressE").value;
  var PhoneEmployee = document.getElementById("txtPhoneE").value;
//   var emailEmployee = document.getElementById("txtEmailE").value;
  var usernameEmployee = document.getElementById("txtUsernameE").value;
  var passwordEmployee = document.getElementById("txtPasswordE").value;
  var idEmployee = "";
  const timestamp = Date.now();
  idEmployee = "E" + RFCEmployee.substring(0, 4)  + timestamp; // E + primeros 4 caracteres de RFC + timestamp

  var posEmployee = findEmployeePositionById(idEmployee);

  var employee = {
    clerkName: nameEmployee,
    clerkApP: ApPEmployee,
    clerkApM: ApMEmployee,
    clerkGender: genderEmployee,
    clerkRFC: RFCEmployee,
    clerkAddress: addressEmployee,
    clerkPhone: PhoneEmployee,
    // clerkEmail: emailEmployee,
    clerkUsername: usernameEmployee,
    clerkPassword: passwordEmployee,
    idClerk: idEmployee,
  };

  console.log(employee);

  //Si posicion es menor a 0, entonces no existe, agregar el producto
  if (posEmployee < 0) {
    employees.push(employee);
  }
  //Si las posiciones no es menor a 0, ya existe dentro del arreglo, entonces se modifica
  else {
    employees[posEmployee] = employee;
  }

  console.log(employees);

  loopEmployees();
  //Aqui falta enviar el objeto al back para que se almacene
  
  //   Swal.fire("Insercion Correcta", "Cliente almacenado", "success");        // comente esta por que no tengo acceso a Swal
}

function cleanFieldsEmployee() {
  $("#txtNameE").val("");
  $("#txtApPE").val("");
  $("#txtApME").val("");
  $("#rbtGenderE").val("");
  $("#txtRFC").val("");
  $("#txtAddressE").val("");
  $("#txtPhoneE").val("");
  $("#txtEmailE").val("");
  $("#txtUsernameE").val("");
  $("#txtPasswordE").val("");
  $("#idEmployee").val("");
}

function closeDetailEmployee() {
  $("#divEmployeeDetail").hide();
  $("#employeeList").removeClass("col-sm-5");
  $("#employeeList").addClass("col-sm-12");
}

function openDetailEmployee() {
  $("#divEmployeeDetail").show();
  $("#employeeList").removeClass("col-sm-5");
  $("#employeeList").addClass("col-sm-12");
}

function loopEmployees() {
  dataTableEmployee = "";
  for (var i in employees) {
    dataTableEmployee += "<tr>";
    dataTableEmployee += "<td>" + employees[i].idClerk + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkName + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkApP + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkApM + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkGender + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkRFC + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkAddress + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkPhone + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkEmail + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkUsername + "</td>";
    dataTableEmployee += "<td>" + employees[i].clerkPassword + "</td>";
    dataTableEmployee +=
      "<td><button class='btn btn-outline-danger' onclick='deleteClient(" +
      employees[i].idClerk +
      ");'><i class='fas fa-times-circle'></i></button></td>";
    dataTableEmployee +=
      "<td><button class='btn btn-outline-warning' onclick='updateClient(" +
      employees[i].idClerk +
      ");'><i class='fas fa-exchange-alt'></i></button></td>";
    dataTableEmployee += "</tr>";
  }

  $("#tbEmployees").html(dataTableEmployee);
}

function deleteEmployee(idClerk) {
  var i = findEmployeePositionById(idClerk);

  if (i > -1) {
    employees.splice(i, 1);
  }
  loopEmployees();
  
  
  // Swal.fire("Eliminacion correcta", "Cliente eliminado", "error");                      // esta tambien la comente
}

function updateEmployee(idClerk) {
  var i = findEmployeePositionById(idClerk);
  openDetailEmployee();
  $("#txtNameE").val(employees[i].clerkName);
  $("#txtApPE").val(employees[i].clerkApP);
  $("#txtApME").val(employees[i].clerkApM);
  $("#rbtGenderE").val(employees[i].clerkGender);
  $("#txtRFC").val(employees[i].clerkRFC);
  $("#txtAddressE").val(employees[i].clerkAddress);
  $("#txtPhoneE").val(employees[i].clerkPhone);
  $("#txtEmailE").val(employees[i].clerkEmail);
  $("#txtUsernameE").val(employees[i].clerkUsername);
  $("#txtPasswordE").val(employees[i].clerkPassword);
  $("#idEmployee").val(employees[i].idClerk);
}

function findEmployeePositionById(idClerk) {
  var pos = -1;
  for (var i = 0; i < employees.length; i++) {
    if (employees[i].id === idClerk) {
      pos = i;
      i = employees.length + 1; //Para romper el ciclo for
    }
  }

  return pos;
}
