from Levels import *

"""Dictionary of the Circites"""

Circuits = {
	"QEC3":QEC3(pyzx=True),
	"QEC7":QEC7(pyzx=True),
	"QFT1":QFT_N(1,pyzx=True),
	"QFT2":QFT_N(2,pyzx=True),
	"QFT3":QFT_N(3,pyzx=True),
	"QFT4":QFT_N(4,pyzx=True),
	"QFT5":QFT_N(5,pyzx=True),
	"QFT6":QFT_N(6,pyzx=True),
	"QFT7":QFT_N(7,pyzx=True),
	"QFT8":QFT_N(8,pyzx=True),
	"QFT9":QFT_N(9,pyzx=True),
	"QFT10":QFT_N(10,pyzx=True),
	"GSA2_0":GSA2(hidden_element=0,pyzx=True),
	"GSA2_1":GSA2(hidden_element=1,pyzx=True),
	"GSA2_2":GSA2(hidden_element=2,pyzx=True),
	"GSA2_3":GSA2(hidden_element=3,pyzx=True),
	"GSA3_0":GSA3(hidden_element=0,iterations=2,pyzx=True),
	"GSA3_1":GSA3(hidden_element=1,iterations=2,pyzx=True),
	"GSA3_2":GSA3(hidden_element=2,iterations=2,pyzx=True),
	"GSA3_3":GSA3(hidden_element=3,iterations=2,pyzx=True),
	"GSA3_4":GSA3(hidden_element=4,iterations=2,pyzx=True),
	"GSA3_5":GSA3(hidden_element=5,iterations=2,pyzx=True),
	"GSA3_6":GSA3(hidden_element=6,iterations=2,pyzx=True),
	"GSA3_7":GSA3(hidden_element=7,iterations=2,pyzx=True)
}

Circuits_False = {
	"QEC3":QEC3(pyzx=False),
	"QEC7":QEC7(pyzx=False),
	"QFT1":QFT_N(1,pyzx=False),
	"QFT2":QFT_N(2,pyzx=False),
	"QFT3":QFT_N(3,pyzx=False),
	"QFT4":QFT_N(4,pyzx=False),
	"QFT5":QFT_N(5,pyzx=False),
	"QFT6":QFT_N(6,pyzx=False),
	"QFT7":QFT_N(7,pyzx=False),
	"QFT8":QFT_N(8,pyzx=False),
	"QFT9":QFT_N(9,pyzx=False),
	"QFT10":QFT_N(10,pyzx=False),
	"GSA2_0":GSA2(hidden_element=0,pyzx=False),
	"GSA2_1":GSA2(hidden_element=1,pyzx=False),
	"GSA2_2":GSA2(hidden_element=2,pyzx=False),
	"GSA2_3":GSA2(hidden_element=3,pyzx=False),
	"GSA3_0":GSA3(hidden_element=0,iterations=2,pyzx=False),
	"GSA3_1":GSA3(hidden_element=1,iterations=2,pyzx=False),
	"GSA3_2":GSA3(hidden_element=2,iterations=2,pyzx=False),
	"GSA3_3":GSA3(hidden_element=3,iterations=2,pyzx=False),
	"GSA3_4":GSA3(hidden_element=4,iterations=2,pyzx=False),
	"GSA3_5":GSA3(hidden_element=5,iterations=2,pyzx=False),
	"GSA3_6":GSA3(hidden_element=6,iterations=2,pyzx=False),
	"GSA3_7":GSA3(hidden_element=7,iterations=2,pyzx=False)
}
