import sys; sys.path.append('pyzx-master')
import pyzx as zx
from Dict import Circuits, ibmq_16_melbourne
from Levels import *
import networkx as nx 


#Create circuit input to test
graph_pyzx=QFT_N(2,pyzx=True)
circ_from_test=zx.extract.extract_circuit(graph_pyzx,optimize_czs=False, optimize_cnots=0)           
qasm_string=circ_from_test.to_qasm()
a=qc.from_qasm_str(qasm_string)

#load in IBMS 16 qubit architecture to test
connections={}
connections=ibmq_16_melbourne['connections']


#Small function that returns a nx graph of a given architecture

def connections_to_nx_graph(connections):

    arch_graph = nx.Graph()
    for connect in connections:
        arch_graph.add_edge(int(connect['source']),int(connect['target']),weight=float(connect['fidelity']))
 
    return arch_graph


#Function which generates a score given a circuit and an architecture
def return_score(circuit_qasm_string, architecture):
    two_qubit_gates=[]
    nx_arch=connections_to_nx_graph(architecture)
    connections=architecture 
   
    
    qasm_list=circuit_qasm_string.split('\n')
    #Loop to count the two qubit gates and store the qubits they act on
    for element in qasm_list:
        if len(element)>0:
            if element[0] =='c':
            
                two_qubit_gate=[int(element[5]),int(element[11]),False]
                two_qubit_gates.append(two_qubit_gate)
                

    #This set of loops determines if each two qubit gate within the QASM string is possible on the 
    # given architecture
    for i in range(len(two_qubit_gates)):
        for d in connections:
    
            temp_TQG=two_qubit_gates[i]
            if d['source']==temp_TQG[0]:
        
                if d['target']==temp_TQG[1]:
                      temp_TQG[2]=True
                      continue
            
            if d['source']==temp_TQG[1]:
        
                if d['target']==temp_TQG[0]:
                    temp_TQG[2]=True
                    continue
                
   
    #two_qubit_gates=[[0, 1, True], [0, 1, True],[7, 5, False], [3, 13, False]]
    
    #loop through each of the two qubit gates.
    #If gate possible on architecture, assign a score based on the fidelity of the connection
    # If not in the architecture, perform Dijsktrika's algorithm to find the shortest path between two points
    score=100
    for j in range(len(two_qubit_gates)):
        if two_qubit_gates[j][2]==True:
            s=two_qubit_gates[j][0]
            t=two_qubit_gates[j][1]
            for con in connections:
                if con['source']==s and con['target']==t:
                    score=score-1*(con['fidelity'])
        
        #now if node not on architecture, perform Dijstikas alg
        #find mininmal weighted path between the two nodes
        #multiply by 3 as 3 CNOTS per swap, and then mult by 2 to traverse the path then back again
        else:
            path=nx.dijkstra_path(nx_arch, two_qubit_gates[j][0], two_qubit_gates[j][1], weight='weight')
            for i in range(len(path)-2):
                s=path[i]
                t=path[i+1]
                for con in connections:
                    if con['source']==s and con['target']==t:
                        score=score-6*(con['fidelity'])
            
    return score
            
                
return_score(qasm_string,connections) 

        

