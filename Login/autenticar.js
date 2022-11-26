function LOGIN(){
			
			if ((document.getElementById('USUA').value == "jeremias0901")&&(document.getElementById('CONTRA').value=="jere123")) {
				window.location="/Liquidar";
			}
			
			else{
				alert("Usuario y/o Contraseña incorrectos.");
			}
		}