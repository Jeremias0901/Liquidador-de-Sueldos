
	var PSem = [];
	var SSem = [];
	
	var MAYPS = 0;
	var MAYSS = 0;

	var i;
	var VAL = "";

function Cargar(SEMESTRE) {

	PSem[0] = parseInt(document.getElementById("ENERO").value);
	PSem[1] = parseInt(document.getElementById("FEBRERO").value);
	PSem[2] = parseInt(document.getElementById("MARZO").value);
	PSem[3] = parseInt(document.getElementById("ABRIL").value);
	PSem[4] = parseInt(document.getElementById("MAYO").value);
	PSem[5] = parseInt(document.getElementById("JUNIO").value);

	SSem[0] = parseInt(document.getElementById("JULIO").value);
	SSem[1] = parseInt(document.getElementById("AGOSTO").value);
	SSem[2] = parseInt(document.getElementById("SEPTIEMBRE").value);
	SSem[3] = parseInt(document.getElementById("OCTUBRE").value);
	SSem[4] = parseInt(document.getElementById("NOVIEMBRE").value);
	SSem[5] = parseInt(document.getElementById("DICIEMBRE").value);

	VAL = "true";

	for (i = 0; (i < 6) && (VAL == "true"); i++) {

		VAL = "false";

		if (PSem[i] >= 0) {
			VAL = "true";
		}

		if (SSem[i] >= 0) {
			VAL = "true";
		}
	}

	if (VAL == "true") {
		/*DESPLEGANDO INPUTS DE LOS RESULTADOS*/
		document.getElementById('ID_BOTON_2').style.display = "block";

		Desplegar_Outputs_Sem_2();
	}

	else if (VAL == "true") {
		/*DESPLEGANDO INPUTS DE LOS RESULTADOS*/
		document.getElementById('ID_BOTON_1').className = "CL_BOTON_activado";
		
		Desplegar_Outputs_Sem_1();
	}

	else alert("Complete correctamente todos los campos.");
}

function Calcular() {

	for (var i = 0; i < 6; i++) {
		if (PSem[i] > MAYPS) {
			MAYPS = PSem[i];
		}
		if (SSem[i] > MAYSS) {
			MAYSS = SSem[i];
		}
	}

	MAYPS = MAYPS / 2;//Aguialdo Primer Semestre
	MAYSS = MAYSS / 2;//Aguialdo Segundo Semestre

	document.getElementById("AGUINALDO_1").value = MAYPS; //Aguialdo Primer Semestre
	document.getElementById("AGUINALDO_2").value = MAYSS; //Aguialdo Segundo Semestre
	document.getElementById("AGUINALDO_MAS_MES_1").value = PSem[5] + MAYPS; //Total en junio
	document.getElementById("AGUINALDO_MAS_MES_2").value = SSem[5] + MAYSS; //Total en diciembre
}

function Desplegar(SEMESTRE, IN_OUT) {

	/*
		SEMESTRE = {1, 2};
		IN_OUT = {
			0 => INPUT
			1 => OUTPUT };
	*/

	if(IN_OUT == 1)
	{
		if (SEMESTRE == 1)
		{
			/*DESACTIVAR OUTPUTS SEMESTRE 2*/
			document.getElementById('ID_OUTPUT_AGUINALDO_2').style.display = "none";
			/*ACTIVAR OUTPUTS SEMESTRE 1*/
			document.getElementById('ID_OUTPUT_AGUINALDO_1').style.display = "block";
		}

		if (SEMESTRE == 2)
		{
			/*DESACTIVAR OUTPUTS SEMESTRE 1*/
			document.getElementById('ID_OUTPUT_AGUINALDO_1').style.display = "none";
			/*ACTIVAR OUTPUTS SEMESTRE 2*/
			document.getElementById('ID_OUTPUT_AGUINALDO_2').style.display = "block";
		}
	}

	else if(IN_OUT == 0)
	{
		if (SEMESTRE == 1)
		{
			/*DESACTIVAR OUTPUTS SEMESTRE 2*/
		    document.getElementById('ID_OUTPUT_AGUINALDO_2').style.display = "none";

		    /*DESACTIVAR BOTON SEMESTRE 2*/
		    document.getElementById('BOTON_2DO_SEM').className = "INPUT_BOTON";
		    /*ACTIVAR BOTON SEMESTRE 2*/
		    document.getElementById('BOTON_1ER_SEM').style.display = "block";

		    /*DESACTIVAR INPUTS SEMESTRE 2*/
		    document.getElementById('ID_INPUT_SEMESTRE_2').style.display = "none";
		    /*ACTIVAR INPUTS SEMESTRE 1*/
		    document.getElementById('ID_INPUT_SEMESTRE_1').className = "CL_INPUT_SEMESTRE_1_activado";

		    /*DESACTIVAR BOTON CALCULAR SEMESTRE 2*/
		    document.getElementById('ID_BOTON_2').style.display = "none";
		    /*ACTIVAR BOTON CALCULAR SEMESTRE 1*/
		    document.getElementById('ID_BOTON_1').style.display = "block";
		}

		if (SEMESTRE == 2)
		{
			/*DESACTIVAR OUTPUTS SEMESTRE 1*/
			document.getElementById('ID_INPUT_AGUINALDO_1').style.display = "none";
			/*ACTIVAR OUTPUTS SEMESTRE 2*/
			document.getElementById('ID_INPUT_AGUINALDO_2').style.display = "block";
		}
	}
}

function Activar_Input_2do_Semestre() {

    /*DESACTIVAR OUTPUTS SEMESTRE 1*/
    document.getElementById('ID_OUTPUT_AGUINALDO_1').style.display = "none";

    /*DESACTIVAR BOTON 1 SEMESTRE*/
    document.getElementById('BOTON_1ER_SEM').className = "INPUT_BOTON";
    /*ACTIVAR BOTON 2 SEMESTRE*/
    document.getElementById('BOTON_2DO_SEM').style.display = "block";

    /*DESACTIVAR BOTON 1 SEMESTRE*/
    document.getElementById('ID_INPUT_SEMESTRE_1').style.display = "none";
    /*ACTIVAR BOTON 2 SEMESTRE*/
    document.getElementById('ID_INPUT_SEMESTRE_2').style.display = "block";

    /*DESACTIVAR BOTON CALCULAR SEMESTRE 1*/
    document.getElementById('ID_BOTON_1').style.display = "none";
    /*ACTIVAR BOTON CALCULAR SEMESTRE 2*/
    document.getElementById('ID_BOTON_2').style.display = "block";
}
