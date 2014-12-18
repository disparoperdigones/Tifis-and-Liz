var tablero, frentes = [];

var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39
};

var fondo = {
	imagenURL: 'fondo.png', //JSON: JavaScript Object Notation
	imagenOK: false
};

var tifis = {
	x: 100,
	y: 100,
	dianas: ['diana-frente.png', 'diana-atras.png', 'diana-der.png', 'diana-izq.png'],
	dianasOK: [false, false, false, false],
	velocidad: 20
};

var liz = {
	lizURL: 'liz.png',
	lizOK: false,
	x: 400,
	y: 200,
	velocidad: 50
};

var paredExterior = {
	YX: [0, 460, 440],
	YXLiz: [0, 450]
};

var paredEscenario = {
	// Pared Horizontal 1
	H: [120, 140, 160, 200, 220],
	HLiz: [100, 150, 200, 250],

	// Pared Horizontal 2
	H2: [120, 300, 360, 320, 340, 100],
	H2Liz: [150, 300, 100, 350, 400],

	// Pared Vertical
	V: [160, 240, 220, 200, 180],
	VLiz: [150, 200, 250]
};

function inicio()
{
	var canvas = document.getElementById('campo');
	tablero = canvas.getContext('2d');

	fondo.imagen = new Image(); // Variable arbitraria creada dentro del objeto fondo
	fondo.imagen.src = fondo.imagenURL;
	fondo.imagen.onload = confirmarFondo;

	for(var i = 0; i <= 3; i++)
	{	
		tifis.frente = new Image(); // Variable arbitraria creada dentro del objeto fondo
		tifis.frente.src = tifis.dianas[i];
		tifis.frente.onload = confirmarDianas[i];
		frentes.push(tifis.frente); // Añado las imágenes de Diana al array frentes
	}

	liz.lizy = new Image();
	liz.lizy.src = liz.lizURL;
	liz.lizy.onload = confirmarLiz;



	document.addEventListener('keydown', teclado);
	setInterval(caminaLiz, 1000);
}

function aleatorio(minimo, maximo) {
	var numero = Math.floor(Math.random() * (maximo - minimo + 1)+ minimo);
	return numero;
}

function caminaLiz()
{
	var camina = aleatorio(0,3), dirLiz;

	if(camina == 0)
	{
		dirLiz = teclas.UP;
	}
	else if(camina == 1)
	{
		dirLiz = teclas.DOWN;
	}
	else if(camina == 2)
	{
		dirLiz = teclas.LEFT;
	}
	else if(camina == 3)
	{
		dirLiz = teclas.RIGHT;
	}

	console.log(dirLiz);

	if(dirLiz == teclas.UP)
	{	
		console.log('Arribaaaaa!!');
		if((liz.y == paredExterior.YXLiz[0]) || (liz.y == paredEscenario.HLiz[3] && liz.x <= paredEscenario.HLiz[0]) || (liz.y == paredEscenario.H2Liz[4] && liz.x >= paredEscenario.H2Liz[0]) || (liz.y == paredEscenario.VLiz[2] && liz.x == paredEscenario.VLiz[1]))
		{
			//paredExterior.paredes = true;
			console.log('Liz: AAAAUUUHHH... Hay una pared');
		}
		else
        {
			liz.y -= liz.velocidad;
		}
	}
	else if(dirLiz == teclas.DOWN)
	{	
		console.log('Abajooooo!!');
		if((liz.y == paredExterior.YXLiz[1]) || (liz.x <= paredEscenario.HLiz[0] && liz.y == paredEscenario.HLiz[1]) || (liz.y == paredEscenario.H2Liz[1] && liz.x >= paredEscenario.H2Liz[0]))
		{
			//paredExterior.paredes = true;
			console.log('Liz: AAAAUUUHHH... Hay una pared');
		}
		else
		{
			liz.y += liz.velocidad;
		}
	}
	else if(dirLiz == teclas.LEFT)
	{
		console.log('Izquierdaaaaa!!');
		if((liz.x == paredExterior.YXLiz[0]) || (liz.x == paredEscenario.VLiz[2] && liz.y <= paredEscenario.VLiz[1]) || (liz.x == paredEscenario.HLiz[1] && liz.y == paredEscenario.HLiz[2]))
		{
			//paredExterior.paredes = true;
			console.log('Liz: AAAAUUUHHH... Hay una pared');
		}
		else
		{
			liz.x -= liz.velocidad;
		}
	}
	else if(dirLiz == teclas.RIGHT)
	{
		console.log('Derechaaaaa!!');
		if((liz.x == paredExterior.YXLiz[1]) || (liz.x == paredEscenario.VLiz[0] && liz.y <= paredEscenario.VLiz[1]) || (liz.x == paredEscenario.H2Liz[2] && liz.y == paredEscenario.H2Liz[350]))
		{
			//paredExterior.paredes = true;
			console.log('Liz: AAAAUUUHHH... Hay una pared');
		}
		else
		{
			liz.x += liz.velocidad;
		}
	}
	
	dibujar();
	
}

function teclado(datos)
{	
	// Guardamos en código el número de la tecla oprimida
	var codigo = datos.keyCode;

	if(codigo == teclas.UP)
	{
		if((tifis.y == paredExterior.YX[0]) || (tifis.y == paredEscenario.H[4] && tifis.x <= paredEscenario.H[0]) || (tifis.y == paredEscenario.H2[2] && tifis.x >= paredEscenario.H2[0]) || (tifis.y == paredEscenario.V[2] && tifis.x >= paredEscenario.V[4] && tifis.x <= paredEscenario.V[2]))
		{
			//paredExterior.paredes = true;
			console.log('AAAAUUUHHH... Hay una pared');
		}
		else
        {
        	//paredExterior.paredes = false
			tifis.y -= tifis.velocidad;
			dibujar();
		}
	}
	if(codigo == teclas.DOWN)
	{
		if((tifis.y == paredExterior.YX[2]) || (tifis.x <= paredEscenario.H[0] && tifis.y == paredEscenario.H[1]) || (tifis.y == paredEscenario.H2[1] && tifis.x >= paredEscenario.H2[0]))
		{
			//paredExterior.paredes = true;
			console.log('AAAAUUUHHH... Hay una pared');
		}
		else
		{
			//paredExterior.paredes = false;
			tifis.y += tifis.velocidad;
			dibujar();
		}
	}
	if(codigo == teclas.LEFT)
	{
		if((tifis.x == paredExterior.YX[0]) || (tifis.x == paredEscenario.V[1] && tifis.y <= paredEscenario.V[3]) || (tifis.x == paredEscenario.H[1] && tifis.y <= paredEscenario.H[3] && tifis.y >= paredEscenario.H[2]))
		{
			//paredExterior.paredes = true;
			console.log('AAAAUUUHHH... Hay una pared');
		}
		else
		{
			tifis.x -= tifis.velocidad;
			dibujar();
		}
	}
	if(codigo == teclas.RIGHT)
	{
		if((tifis.x == paredExterior.YX[1]) || (tifis.x == paredEscenario.V[0] && tifis.y <= paredEscenario.V[2]) || (tifis.x == paredEscenario.H2[5] && tifis.y > paredEscenario.H2[3] - 20 && tifis.y < paredEscenario.H2[4] + 20))
		{
			//paredExterior.paredes = true;
			console.log('AAAAUUUHHH... Hay una pared');
		}
		else if((tifis.y == liz.y - 10 || tifis.x == liz.x - 10) || (tifis.y == liz.y + 10 || tifis.x == liz.x + 10))
		{
			alert('LIZ!!');
			alert('Te impediré destruir al mundo con esa minifalda');
		}
		else
		{
			tifis.x += tifis.velocidad;
			dibujar();
		}
	}

	dibujar(codigo);
}

function confirmarLiz()
{
	liz.lizOK = true;
	dibujar();
}
function confirmarFondo()
{
	fondo.imagenOK = true;
	dibujar();
}
function confirmarDianas()
{
	tifis.dianasOK = [true, true, true, true];
	dibujar();
}

function dibujar(direccion)
{
	// Capa 1: Fondo
	if(fondo.imagenOK == true)
	{
		tablero.drawImage(fondo.imagen, 0, 0);
	}

	// Capa 2: Diana
	var tifisDibujo = tifis.frente[0];

	if(tifis.dianasOK)
    {
		if(direccion == teclas.DOWN || direccion == undefined)
        {
        	// console.log(liz.x+' '+liz.y);
            tifisDibujo = frentes[0];
        }
        else if(direccion == teclas.UP)
        {
            tifisDibujo = frentes[1];
        }
        else if(direccion == teclas.RIGHT)
        {
            tifisDibujo = frentes[2];
        }
        else if(direccion == teclas.LEFT)
        {
            tifisDibujo = frentes[3];
        }
    }
    tablero.drawImage(tifisDibujo, tifis.x, tifis.y);

	// Capa 3: Liz
	// Como lizOK es booleana, no necesito comparar
	if(liz.lizOK)
	{
		tablero.drawImage(liz.lizy, liz.x, liz.y);
	}
}