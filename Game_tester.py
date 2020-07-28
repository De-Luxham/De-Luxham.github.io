import sys; sys.path.append('pyzx-master')
import numpy as np
import random, math, os
import pyzx as zx
from fractions import Fraction
from IPython.display import display
import webbrowser
import time
import csv
import d3_no_jup

from Dict import Circuits



#LOADING THE GRAPH SEBS BEEN WORKING WITH
# =============================================================================
for item in Circuits:
	graph = Circuits[item]#zx.generate.cliffords(qubit_amount, depth)
	

	html = d3_no_jup.draw(graph)
	name = r"./web/level_"+item+".html"
	f = open(name,"w")#r"web/graph_test_copy.html", "w")
	f.write(html)
	f.close()
