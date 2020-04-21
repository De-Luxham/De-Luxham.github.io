define(['d3'], function(d3) {
    
    

   
          
    
    
    // styling functions
    function nodeColor(t) {
        if (t == 0) return "black";
        else if (t == 1) return "green";
        else if (t == 2) return "red";
        else if (t == 3) return "yellow";
        else if (t == 4) return "blue";
    }

    function edgeColor(t) {
        if (t == 1) return "black";
        else if (t == 2) return "#08f";
    }

    function nodeStyle(selected) {
        return selected ? "stroke-width: 2px; stroke: #00f" : "stroke-width: 1.5px";
    }

    return {
    showGraph: function(tag, graph, width, height, node_size, connectivity) {

    
        //Basic connectivity example
        connectivity = {connections:[{source:0,target:1,t:1,index:0},{source:1,target:2,t:1,index:1}]};
    
        
        
        var ntab = {};
        //hard coded option for node size 
        node_size = 9
        scale = 1;
        auto_hbox = false;
        show_labels = true;
        
        graph.nodes.forEach(function(d) {
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
        });

        var spiders_and_boundaries = graph.nodes.filter(function(d) {
            return d.t != 3;
        });

        graph.links.forEach(function(d) {
            var s = ntab[d.source];
            var t = ntab[d.target];
            d.source = s;
            d.target = t;
            s.nhd.push(t);
            t.nhd.push(s);
        });

        var shiftKey;
        
        //New var added for force simulation
        var simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
        .id(function(d) { return d.id; }).strength(0.03))
        .force("charge", d3.forceManyBody().strength(-10))
        .force("center", d3.forceCenter(width / 2, height / 2))
    

        
        // SETUP SVG ITEMS

        var svg = d3.select(tag)
            //.attr("tabindex", 1)
            .on("keydown.brush", function() {shiftKey = d3.event.shiftKey || d3.event.metaKey;})
            .on("keyup.brush", function() {shiftKey = d3.event.shiftKey || d3.event.metaKey;})
            //.each(function() { this.focus(); })
            .append("svg")
            .attr("style", "max-width: none; max-height: none")
            .attr("width", width)
            .attr("height", height);

        //Set up connectivity graph inbetween these lines
        //Connectivity Graph
        //This section generates a directed graph underneath the input qubits 
        //It shows the connectivity between the qubits
        
        var num_qubits = (graph.nodes.filter(function(d) {return d.t == 0;}).length)/2;
        var qnodes = []

        for (let i = 0; i < num_qubits; i++) {
            qnodes.push({name:i, x:graph.nodes[i].x, y:graph.nodes[i].y, t:4, phase:'', selecetd:false, previouslySelected:false, index:i, vy:0, vx:0});
        }

        //updates the connectivity object with node object data
        for (let i = 0; i < connectivity.connections.length; i++) {
            connectivity.connections[i].source = graph.nodes[connectivity.connections[i].source];
            connectivity.connections[i].target = graph.nodes[connectivity.connections[i].target];
        }

        var connectivity_graph = {nodes: qnodes,links:connectivity.connections};
        console.log(connectivity_graph);
        // build the arrow.
        svg.append("svg:defs").selectAll("marker")
           .data(["end"])      // Different link/path types can be defined here
           .enter().append("svg:marker")    // This section adds in the arrows
           .attr("id", String)
           .attr("viewBox", "0 -5 10 10")
           .attr("refX", 15)
           .attr("refY", -1.5)
           .attr("markerWidth", 6)
           .attr("markerHeight", 6)
           .attr("orient", "auto")
           .append("svg:path")
           .attr("d", "M0,-5L10,0L0,5");
           
        
       var clink  = svg.append("g")
       .attr("class", "link")
       .selectAll("line")
       .data(connectivity_graph.links)
       .enter().append("line")
       .attr("stroke", "black")
       .attr("style", "stroke-width: 1.5px")
       .attr("marker-end", "url(#end)");

       
       var cnode = svg.append("g")
           .attr("class", "node")
           .selectAll("g")
           .data(connectivity_graph.nodes)
           .enter().append("g")
           .attr("transform", function(d) {
               return "translate(" + d.x + "," + d.y +")";
           });

       cnode.append("circle")
           .attr("r", function(d) {
              return 0.75*node_size;
           })
           .attr("fill", function(d) { return nodeColor(d.t); })
           .attr("stroke", "black");


        //End of connectivity graph setup

        var link = svg.append("g")
            .attr("class", "link")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
            .attr("stroke", function(d) { return edgeColor(d.t); })
            .attr("style", "stroke-width: 1.5px")
            .attr("class", "link").on("click", function(d) { console.log("clicked");});

        //added new attribute name, type and nhd
        
        var node = svg.append("g")
            .attr("class", "node")
            .selectAll("g")
            .data(graph.nodes)
            .enter().append("g")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y +")";
            });

        node.filter(function(d) { return d.t != 3; })
            .append("circle")
            .attr("r", function(d) {
               if (d.t == 0) return 0.5 * node_size;
               else return node_size;
            })
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

        var hbox = node.filter(function(d) { return d.t == 3; });

        hbox.append("rect")
            .attr("x", -0.75 * node_size).attr("y", -0.75 * node_size)
            .attr("width", node_size * 1.5).attr("height", node_size * 1.5)
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

        node.filter(function(d) { return d.phase != ''; })
            .append("text")
            .attr("y", 0.7 * node_size + 14)
            .text(function (d) { return d.phase })
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-family", "monospace")
            .attr("fill", "#00d");

        if (show_labels) {
            node.append("text")
                .attr("y", -0.7 * node_size - 5)
                .text(function (d) { return d.name; })
                .attr("text-anchor", "middle")
                .attr("font-size", "8px")
                .attr("font-family", "monospace")
                .attr("fill", "#ccc");
        }

        
        
       

    

    
        //New variables added between these lines
        //dimension variables have offsets, hard coded for now but that may change
        var width = svg.attr("width"),
            height = svg.attr("height")+1,
            radius = node_size;

        var node_count = graph.nodes.length,
            link_count = graph.links.length;
        
        
        
        //variable to hold slice graphic
        var slice = svg.append("g")
            .attr("class", "link")
            .append("line")
            .attr("stroke", "black")
            .attr("style", "stroke-width: 1.5px")
            .attr("id", "slice");

        //Trying Slice implementation without graphic
        var slice_nog = {x1:null, y1: null, x2: null, y2:null};
            
        var rule_applied = false;
        

        
        //End of new variables
        
        //New functions added between these lines
        
        //graph update
        function update() {
        
        console.log("graph updated");
         /*link = svg.select("g").selectAll("line").data(graph.links);
         
         node = svg.select("g").selectAll("g").data(graph.nodes);
         
         node.exit().remove();
         
         link.exit().remove();*/
        
        

         
         
        
            
            //separate
            
            svg.selectAll("g").remove();
            
            clink  = svg.append("g")
       .attr("class", "link")
       .selectAll("line")
       .data(connectivity_graph.links)
       .enter().append("line")
       .attr("stroke", "black")
       .attr("style", "stroke-width: 1.5px")
       .attr("marker-end", "url(#end)");

       
        cnode = svg.append("g")
           .attr("class", "node")
           .selectAll("g")
           .data(connectivity_graph.nodes)
           .enter().append("g")
           .attr("transform", function(d) {
               return "translate(" + d.x + "," + d.y +")";
           });

       cnode.append("circle")
           .attr("r", function(d) {
              return 0.75*node_size;
           })
           .attr("fill", function(d) { return nodeColor(d.t); })
           .attr("stroke", "black");

           clink.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
            
            
            link = svg.append("g")
            .attr("class", "link").selectAll("line").data(graph.links).enter().append("line")
            .attr("stroke", function(d) { return edgeColor(d.t); })
            .attr("style", "stroke-width: 1.5px");
            
            node = svg.append("g")
                .attr("class", "node")
                .selectAll("g")
                .data(graph.nodes)
                .enter()
                .append("g")
                .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y +")";
            });
            
            

        

        node.filter(function(d) { return d.t != 3; })
            .append("circle")
            .attr("r", function(d) {
               if (d.t == 0) return 0.5 * node_size;
               else return node_size;
            })
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

         hbox = node.filter(function(d) { return d.t == 3; });

        hbox.append("rect")
            .attr("x", -0.75 * node_size).attr("y", -0.75 * node_size)
            .attr("width", node_size * 1.5).attr("height", node_size * 1.5)
            .attr("fill", function(d) { return nodeColor(d.t); })
            .attr("stroke", "black");

        node.filter(function(d) { return d.phase != ''; })
            .append("text")
            .attr("y", 0.7 * node_size + 14)
            .text(function (d) { return d.phase })
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-family", "monospace")
            .attr("fill", "#00d");
            
        if (show_labels) {
            node.append("text")
                .attr("y", -0.7 * node_size - 5)
                .text(function (d) { return d.name; })
                .attr("text-anchor", "middle")
                .attr("font-size", "8px")
                .attr("font-family", "monospace")
                .attr("fill", "#ccc");
                }
        
        simulation
                .nodes(graph.nodes.filter(function(d) {return d.t != 0;}))
                .on("tick", ticked);
      
        simulation.force("link")
                .links(graph.links);     
            
            
            
            console.log(node);
            
            //BIG ASS TEST CODE TEMPOARY BETWEEN THESE LINES
            
            node.on("mousedown", function(d) {
                /*if (shiftKey) {
                    d3.select(this).select(":first-child").attr("style", nodeStyle(d.selected = !d.selected));
                    d3.event.stopImmediatePropagation();
                } else if (!d.selected) {
                    node.select(":first-child").attr("style", function(p) { return nodeStyle(p.selected = d === p); });*/
                    
                    //New stuff for when a node is selected
                
                    d.selected = true;
                    
                    console.log(graph.nodes.filter(function(d) {return d.selected;})[0]);
                    
                    simulation.alphaTarget(0.1).restart();
                    
                //}
            })
            .call(d3.drag().on("drag", function(d) {
                var dx = d3.event.dx;
                var dy = d3.event.dy;
                // node.filter(function(d) { return d.selected; })
                //     .attr("cx", function(d) { return d.x += dx; })
                //     .attr("cy", function(d) { return d.y += dy; });
            
                //added this thing for the force stuf
                simulation.alphaTarget(0.1).restart();
                
                console.log(rule_applied);
                
                if (rule_applied == false) {
                
                    node.filter(function(d) { return d.selected; })
                    .attr("transform", function(d) {
                        d.x += dx;
                        d.y += dy;
                        return "translate(" + d.x + "," + d.y +")";
                    });

                    update_hboxes();

                    link.filter(function(d) { return d.source.selected ||
                                            (auto_hbox && d.source.t == 3); })
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; });

                    link.filter(function(d) { return d.target.selected ||
                                            (auto_hbox && d.target.t == 3); })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                // text.filter(function(d) { return d.selected; })
                //     .attr("x", function(d) { return d.x; })
                //     .attr("y", function(d) { return d.y + 0.7 * node_size + 14; });
                
                //New stuff added to check for collison
                
                    var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
                    
                    
                    var connected_same_type_nodes = selected_node.nhd.filter(function(d) {return selected_node.t == d.t;});
                
                //apply fusion rule when checks passed
                    var to_fuse = false;
                    var dead_node = {};
                    
                    
                    connected_same_type_nodes.forEach(function(d) {if (collided(d,selected_node)) {
                        to_fuse = true;
                        dead_node = d; 
                    
                    }});
                    
                    
                
                    if (to_fuse == true) {
                        rule_applied = true;
                        console.log(rule_applied);
                        fusion(selected_node,dead_node);
                        to_fuse = false;
                        graph.nodes.forEach(function(d) {d.selected = false;});
                        
                        update();
                        console.log(graph);
                    
                     }
                
                }
                
                
            
                
                 
                    
            
                
                
                 
                
            }).on("end", function() {console.log("mouseup");
                graph.nodes.forEach(function(d) {d.selected = false;}); 
                rule_applied = false;}));
            
            //END OF BIG ASS TEST
            
            //makes force sim relax after a bit
            
        
        }
        
        //returns true if nodes have collided
        function collided(node1,node2) {
            return 2*radius >= Math.abs(Math.sqrt(Math.pow(node1.x-node2.x,2)+Math.pow(node1.y-node2.y,2)));
        }
        //Get index of link that connects two nodes
        function i_link(n1,n2) {
            
            var i =-1;
            
            graph.links.forEach(function(d, index) {
                if (((d.source.name.localeCompare(n1.name) == 0) && (d.target.name.localeCompare(n2.name) == 0)) || ((d.source.name.localeCompare(n2.name) == 0) && (d.target.name.localeCompare(n1.name) == 0))) {
                    return i = index;
                
                }
            } );
            return i;
        }
        
        //does a link connect two nodes
        function is_link(l,n1,n2) {
            return (((l.source.name.localeCompare(n1.name) == 0) && (l.target.name.localeCompare(n2.name) == 0)) || ((l.source.name.localeCompare(n2.name) == 0) && (l.target.name.localeCompare(n1.name) == 0)));
        }
        
        //Get index of node
        function i_node(n) {
        
            var i = -1;
            
            graph.nodes.forEach(function(d,index) {
                if (d.name.localeCompare(n.name) == 0) {
                    i = index;
                }
             });
             return i;
        }

        //remove ids rule
        function remove_node(selected_node) {

            //removes link between node and first member of nhd
            graph.links = graph.links.filter(function(d) {return !(is_link(d,selected_node,selected_node.nhd[0])); });

            //set links whose target/source is selected node and its second neigbour to the first neighbour
            graph.links.forEach(function(d) {
                if (d.target.name.localeCompare(selected_node.name) == 0) {
                    d.target = selected_node.nhd[0];
                
                }
                if (d.source.name.localeCompare(selected_node.name) == 0) {
                    d.source = selected_node.nhd[0];
                
                }
                
            
            });

            //remove id node
            
            graph.nodes = graph.nodes.filter(function(d) {return d.name != selected_node.name});
        
            
            ntab = {};
            
            graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });

            console.log(ntab);
            console.log(graph.nodes);
            console.log(graph.links);

            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
        });


            
        }
        
        //fusion rule
        function fusion(selected_node,dead_node) {
        
            console.log("fusion applied");
            
            //remove connecting link
            
            
            
            graph.links = graph.links.filter(function(d) {return !(is_link(d,selected_node,dead_node)); });
            
        
            
        
            
            //set links whose target is deadnode to selecetd node
            graph.links.forEach(function(d) {
                if (d.target.name.localeCompare(dead_node.name) == 0) {
                    d.target = selected_node;
                
                }
                if (d.source.name.localeCompare(dead_node.name) == 0) {
                    d.source = selected_node;
                
                }
                
            
            });
            
            //remove dead node
            
            graph.nodes = graph.nodes.filter(function(d) {return d.name != dead_node.name});
            
            console.log(graph);
            
             ntab = {};
            
             graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });

            console.log(ntab);
            console.log(graph.nodes);
            console.log(graph.links);

            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
        });
            
            
        }
        
        //split rule
        
        function split(sliced_node, s_line) {

            //Gradient of slice
            var m = (s_line.y2 - s_line.y1)/(s_line.x2 - s_line.x1);
            
            //increment the total node count
            node_count++;

            //Add new node to list of nodes, Can do this by copying slcied node appending then changing its values
            var new_node = {name:node_count.toString(), x:sliced_node.x+3, y:sliced_node.y+3, t:sliced_node.t, phase:sliced_node.phase, selecetd:false, previouslySelected:false, index:node_count, vy:0, vx:0};



            graph.nodes.push(new_node);


            //change the connections of existing links

            graph.links.forEach(function(d) {
                if ((d.target.name.localeCompare(sliced_node.name) == 0) && (d.source.y > m*(d.source.x - s_line.x1) +s_line.y1)) {
                    d.target = new_node;
                
                }
                if ((d.source.name.localeCompare(sliced_node.name) == 0) && (d.target.y > m*(d.target.x - s_line.x1) +s_line.y1)) {
                    d.source = new_node;
                
                }
                
             console.log("in links for each loop")
            });

            //create new link connecting the sliced node and the new one

            //increment the link counter
            link_count++;
            
            var new_link = {source: sliced_node , target: new_node, t:1, index: link_count};

            

            //add this link to the links array
            graph.links.push(new_link);

            //re update neighbour connections

            ntab = {};
            
            graph.nodes.forEach(function(d) {
            console.log("node update");
            ntab[d.name] = d;
            d.selected = false;
            d.previouslySelected = false;
            d.nhd = [];
            });


            graph.links.forEach(function(d) {
                s= d.source;
                t = d.target;
                s.nhd.push(t);
                t.nhd.push(s);
            
            });
        }
        
        //checks if slice region contains circle
        //more generally checks if point is contained in box defined by sline
        function in_box(circle, s_line) {
            return (((circle.cx >= s_line.x1 && circle.cx <= s_line.x2) || (circle.cx >= s_line.x2 && circle.cx <= s_line.x1)) && ((circle.cy >= s_line.y1 && circle.cy <= s_line.y2) || (circle.cy >= s_line.y2 && circle.cy <= s_line.y1)));
            }
            
        function cuts_circle(circle, s_line) {
            var m = (s_line.y2 - s_line.y1)/(s_line.x2 - s_line.x1);
            var D = Math.pow(2*m*(-m*s_line.x1 + s_line.y2 - circle.cy)-2*circle.cx,2)-4*(Math.pow(m,2)+1)*(Math.pow(circle.cx,2)+Math.pow(-m*s_line.x1 + s_line.y2 - circle.cy,2)-Math.pow(circle.r,2));
            return D > 0;
        }
        
        //update look of graph stuff
        
        //End of new stuff

        function update_hboxes() {
            if (auto_hbox) {
                var pos = {};
                hbox.attr("transform", function(d) {
                    // calculate barycenter of non-hbox neighbours, then nudge a bit
                    // to the NE.
                    var x=0,y=0,sz=0;
                    for (var i = 0; i < d.nhd.length; ++i) {
                        if (d.nhd[i].t != 3) {
                            sz++;
                            x += d.nhd[i].x;
                            y += d.nhd[i].y;
                        }
                    }

                    offset = 0.25 * scale;

                    if (sz != 0) {
                        x = (x/sz) + offset;
                        y = (y/sz) - offset;

                        while (pos[[x,y]]) {
                            x += offset;
                        }
                        d.x = x;
                        d.y = y;
                        pos[[x,y]] = true;
                    }

                    return "translate("+d.x+","+d.y+")";
                });
            }
        }

        update_hboxes();

        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        
        //links for connectivity graph
        clink.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        //Stuff for force directed part
        

        //only coloured nodes are in the simulation
        simulation
          .nodes(graph.nodes.filter(function(d) {return d.t != 0;}))
          .on("tick", ticked);

        simulation.force("link")
          .links(graph.links.filter(function(d) {return ((d.source.t !=0) && (d.target.t != 0));}));

         

        function ticked() {
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            
            //stuff to keep nodes inside a box
            
            node.attr("transform", function(d) {
                d.x = Math.max(radius, Math.min(width - radius, d.x));
                d.y = Math.max(radius, Math.min(height - radius, d.y));
                return "translate(" + d.x + "," + d.y +")";
             })
        
            link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
        }
          
        
        
        
        // EVENTS FOR DRAGGING AND SELECTION

        node.on("mousedown", function(d) {
                /*if (shiftKey) {
                    d3.select(this).select(":first-child").attr("style", nodeStyle(d.selected = !d.selected));
                    d3.event.stopImmediatePropagation();
                } else if (!d.selected) {
                    node.select(":first-child").attr("style", function(p) { return nodeStyle(p.selected = d === p); });*/
                    
                    //New stuff for when a node is selected
                
                    d.selected = true;
                    
                    console.log(graph.nodes.filter(function(d) {return d.selected;})[0]);
                    
                    simulation.alphaTarget(0).restart();
                    
                //}
            })
            .call(d3.drag().on("drag", function(d) {
                var dx = d3.event.dx;
                var dy = d3.event.dy;
                // node.filter(function(d) { return d.selected; })
                //     .attr("cx", function(d) { return d.x += dx; })
                //     .attr("cy", function(d) { return d.y += dy; });
            
                //added this thing for the force stuff
                
                simulation.alphaTarget(0).restart();
                
                
                
                if (rule_applied == false) {
                
                    node.filter(function(d) { return d.selected; })
                    .attr("transform", function(d) {
                        d.x += dx;
                        d.y += dy;
                        return "translate(" + d.x + "," + d.y +")";
                    });

                    update_hboxes();

                    link.filter(function(d) { return d.source.selected ||
                                            (auto_hbox && d.source.t == 3); })
                    .attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; });

                    link.filter(function(d) { return d.target.selected ||
                                            (auto_hbox && d.target.t == 3); })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                // text.filter(function(d) { return d.selected; })
                //     .attr("x", function(d) { return d.x; })
                //     .attr("y", function(d) { return d.y + 0.7 * node_size + 14; });
                
                //New stuff added to check for collison
                
                    var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
                    
                    
                    var connected_same_type_nodes = selected_node.nhd.filter(function(d) {return selected_node.t == d.t;});
                
                //apply fusion rule when checks passed
                    var to_fuse = false;
                    var dead_node = {};
                    
                    
                    connected_same_type_nodes.forEach(function(d) {if (collided(d,selected_node)) {
                        to_fuse = true;
                        dead_node = d; 
                    
                    }});
                    
                    
                
                    if (to_fuse == true) {
                        rule_applied = true;
                        console.log(rule_applied);
                        fusion(selected_node,dead_node);
                        to_fuse = false;
                        graph.nodes.forEach(function(d) {d.selected = false;});
                        
                        update();
                        console.log(graph);
                    
                     }
                
                }
                
                
            
                
                 
                    
            
                
                
                 
                
            }).on("end", function() {console.log("mouseup");
                graph.nodes.forEach(function(d) {d.selected = false;}); 
                rule_applied = false;}));
            
        //Implementation of slice rule
        
        svg.on("mousedown", function () {
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];
            
            //slice.enter();
            
            
            //slice.attr("x1", function(d) { return x; })
                 //.attr("y1", function(d) { return y; })
            slice_nog.x1 = x;
            slice_nog.y1 = y    
        
               
            }).call(d3.drag().on("drag", function(d) {
                var x = d3.event.x;
                var y = d3.event.y;
                
                //slice.attr("x2", function(d) { return x; })
                     //.attr("y2", function(d) { return y; })
                     //.attr("opacity", 1);
                slice_nog.x2 = x;
                slice_nog.y2 = y; 
               
                
            }).on("end", function() {
                
                if (rule_applied == false) {
                //define line object to hold line coordinates
                    //var s_line = {x1: slice.attr("x1"),x2: slice.attr("x2"), y1:slice.attr("y1"), y2:slice.attr("y2")};
                    var s_line = {x1: slice_nog.x1,x2: slice_nog.x2, y1:slice_nog.y1, y2:slice_nog.y2};

                    var to_slice = false;
                    var sliced_node = {};
                
                    graph.nodes.forEach(function(d) {
                    
                    //circle info for node
                        var circle = {cx: d.x, cy: d.y, r: radius};


                    
                        if (in_box(circle, s_line) && cuts_circle && (d.t != 0) && (d.t != 3)) {
                        console.log(d.name);
                        console.log("Apply slice");
                        to_slice = true;
                        sliced_node = d;
                        
                        
                                           
                        }
                
                    
                    });

                    if (to_slice) {
                        update();
                        rule_applied = true;
                        console.log("before split")
                        split(sliced_node, s_line);
                        console.log("after split")
                        to_slice = false;
                        
                        update();
                        console.log(graph);
                        console.log("graphupdated");
                    }   
                
                
                slice.attr("opacity", 0);
            }
             rule_applied = false
            }));
        
        //End of slice rule implementatio

        //Implementation of inserting identities
        
        //variable to check which colour to insert
        var ins_red = false;

        svg.on("dblclick", function(d) {
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];

            var selection_circle = {x: x, y: y, r: radius};

            var to_insid = false;

            //insertion of identities is triggered by a selection circle (where you click defines a node sized circle)
            //the selection circle then has to intersect a midpoint circle (node sized) at the midpoint of the line to trigger


            graph.links.forEach(function(d) {
                var link_line = {x1: d.source.x,x2: d.target.x, y1: d.source.y, y2: d.target.y};

                var mx = (link_line.x2 + link_line.x1)/2;
                var my = (link_line.y2 + link_line.y1)/2;

                var link_midcircle = {x: mx, y: my, r: radius};
                
                

                if (collided(link_midcircle,selection_circle) && (to_insid == false)) {
                    
                    
                    to_insid = true;
                    
                    
                    
                }
            });
                
                
            

        }).on("click", function(d) {
            var x = d3.mouse(this)[0];
            var y = d3.mouse(this)[1];

            var selection_circle = {x: x, y: y, r: radius};

            var to_insid = false;

            //insertion of identities is triggered by a selection circle (where you click defines a node sized circle)
            //the selection circle then has to intersect a midpoint circle (node sized) at the midpoint of the line to trigger

            graph.links.forEach(function(d) {
                var link_line = {x1: d.source.x,x2: d.target.x, y1: d.source.y, y2: d.target.y};

                var mx = (link_line.x2 + link_line.x1)/2;
                var my = (link_line.y2 + link_line.y1)/2;

                var link_midcircle = {x: mx, y:my, r: radius};

                if (collided(link_midcircle,selection_circle) && (to_insid == false)) {
                    
                    console.log("Insert green Id");
                    to_insid = true;
                    
                    
                    
                }
            });
                
                
            

        });


        

        node.on("click", function(d) {

            d.selected = true;

            var selected_node = graph.nodes.filter(function(d) {return d.selected;})[0];
            //Implementation of removing ids
            if ((selected_node.t == 1 || selected_node.t == 2) && selected_node.nhd.length == 2) {
                console.log("remove id");
                remove_node(selected_node);
                update();
                d.selected = false;

            }

            //Implementation of changing qubit to red spider
            if (selected_node.t == 0) {
                //set the qubit node to a red spider
                selected_node.t = 2;
                update();
                d.selected = false;

            }

        });

        

        
        
        //Implementation of colour change rule
        
        node.on("dblclick", function() {
            console.log("complement rule");
        
        });
        
        //end of implementation of complement rule
        
        
        /*brush.call(d3.brush()
            .extent([[0, 0], [width, height]])
            .on("start", function() {
                if (d3.event.sourceEvent.type !== "end") {
                    node.select(":first-child").attr("style", function(d) {
                        return nodeStyle(
                            d.selected = d.previouslySelected = shiftKey &&
                            d.selected);
                    });
                }
            })
            .on("brush", function() {
                if (d3.event.sourceEvent.type !== "end") {
                    var selection = d3.event.selection;
                    node.select(":first-child").attr("style", function(d) {
                        return nodeStyle(d.selected = d.previouslySelected ^
                            (selection != null
                            && selection[0][0] <= d.x && d.x < selection[1][0]
                            && selection[0][1] <= d.y && d.y < selection[1][1]));
                    });
                }
            })
            .on("end", function() {
                if (d3.event.selection != null) {
                    d3.select(this).call(d3.event.target.move, null);
                }
            }));*/
        
    }};
});