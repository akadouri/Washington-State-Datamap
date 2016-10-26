! function() {
    function a(a, b, c) {
        "undefined" == typeof c && (c = b, optionsValues = void 0);
        var d = "undefined" != typeof a ? a : b;
        if ("undefined" == typeof d) return null;
        if ("function" == typeof d) {
            var e = [c];
            return c.geography && (e = [c.geography, c.data]), d.apply(null, e)
        }
        return d
    }

    function b(a, b, c) {
        return this.svg = n.select(a).append("svg").attr("width", c || a.offsetWidth).attr("data-width", c || a.offsetWidth).attr("class", "datamap").attr("height", b || a.offsetHeight).style("overflow", "hidden"), this.options.responsive && (n.select(this.options.element).style({
            position: "relative",
            "padding-bottom": 100 * this.options.aspectRatio + "%"
        }), n.select(this.options.element).select("svg").style({
            position: "absolute",
            width: "100%",
            height: "100%"
        }), n.select(this.options.element).select("svg").select("g").selectAll("path").style("vector-effect", "non-scaling-stroke")), this.svg
    }

    function c(a, b) {
        var c, d, e = b.width || a.offsetWidth,
            f = b.height || a.offsetHeight,
            g = this.svg;
        return b && "undefined" == typeof b.scope && (b.scope = "world"), "usa" === b.scope ? c = n.geo.albersUsa().scale(e).translate([e / 2, f / 2]) : "world" === b.scope && (c = n.geo[b.projection]().scale((e + 1) / 2 / Math.PI).translate([e / 2, f / ("mercator" === b.projection ? 1.45 : 1.8)])), "orthographic" === b.projection && (g.append("defs").append("path").datum({
            type: "Sphere"
        }).attr("id", "sphere").attr("d", d), g.append("use").attr("class", "stroke").attr("xlink:href", "#sphere"), g.append("use").attr("class", "fill").attr("xlink:href", "#sphere"), c.scale(250).clipAngle(90).rotate(b.projectionConfig.rotation)), d = n.geo.path().projection(c), {
            path: d,
            projection: c
        }
    }

    function d() {
        n.select(".datamaps-style-block").empty() && n.select("head").append("style").attr("class", "datamaps-style-block").html('.datamap path.datamaps-graticule { fill: none; stroke: #777; stroke-width: 0.5px; stroke-opacity: .5; pointer-events: none; } .datamap .labels {pointer-events: none;} .datamap path:not(.datamaps-arc), .datamap circle, .datamap line {stroke: #FFFFFF; vector-effect: non-scaling-stroke; stroke-width: 1px;} .datamaps-legend dt, .datamaps-legend dd { float: left; margin: 0 3px 0 0;} .datamaps-legend dd {width: 20px; margin-right: 6px; border-radius: 3px;} .datamaps-legend {padding-bottom: 20px; z-index: 1001; position: absolute; left: 4px; font-size: 12px; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;} .datamaps-hoverover {display: none; font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; } .hoverinfo {padding: 4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; } .hoverinfo hr {border:1px dotted #CCC; }')
    }

    function e(b) {
        var c = this.options.fills,
            d = this.options.data || {},
            e = this.options.geographyConfig,
            f = this.svg.select("g.datamaps-subunits");
        f.empty() && (f = this.addLayer("datamaps-subunits", null, !0));
        var g = o.feature(b, b.objects[this.options.scope]).features;
        e.hideAntarctica && (g = g.filter(function(a) {
            return "ATA" !== a.id
        })), e.hideHawaiiAndAlaska && (g = g.filter(function(a) {
            return "HI" !== a.id && "AK" !== a.id
        }));
        var h = f.selectAll("path.datamaps-subunit").data(g);
        h.enter().append("path").attr("d", this.path).attr("class", function(a) {
            return "datamaps-subunit " + a.id
        }).attr("data-info", function(a) {
            return JSON.stringify(d[a.id])
        }).style("fill", function(b) {
            var e, f = d[b.id];
            return f && f.fillKey && (e = c[a(f.fillKey, {
                data: d[b.id],
                geography: b
            })]), "undefined" == typeof e && (e = a(f && f.fillColor, c.defaultFill, {
                data: d[b.id],
                geography: b
            })), e
        }).style("stroke-width", e.borderWidth).style("stroke-opacity", e.borderOpacity).style("stroke", e.borderColor)
    }

    function f() {
        function b() {
            this.parentNode.appendChild(this)
        }
        var c = this.svg,
            d = this,
            e = this.options.geographyConfig;
        (e.highlightOnHover || e.popupOnHover) && c.selectAll(".datamaps-subunit").on("mouseover", function(f) {
            var g = n.select(this),
                h = d.options.data[f.id] || {};
            if (e.highlightOnHover) {
                var i = {
                    fill: g.style("fill"),
                    stroke: g.style("stroke"),
                    "stroke-width": g.style("stroke-width"),
                    "fill-opacity": g.style("fill-opacity")
                };
                g.style("fill", a(h.highlightFillColor, e.highlightFillColor, h)).style("stroke", a(h.highlightBorderColor, e.highlightBorderColor, h)).style("stroke-width", a(h.highlightBorderWidth, e.highlightBorderWidth, h)).style("stroke-opacity", a(h.highlightBorderOpacity, e.highlightBorderOpacity, h)).style("fill-opacity", a(h.highlightFillOpacity, e.highlightFillOpacity, h)).attr("data-previousAttributes", JSON.stringify(i)), /((MSIE)|(Trident))/.test(navigator.userAgent) || b.call(this)
            }
            e.popupOnHover && d.updatePopup(g, f, e, c)
        }).on("mouseout", function() {
            var a = n.select(this);
            if (e.highlightOnHover) {
                var b = JSON.parse(a.attr("data-previousAttributes"));
                for (var c in b) a.style(c, b[c])
            }
            a.on("mousemove", null), n.selectAll(".datamaps-hoverover").style("display", "none")
        })
    }

    function g(a, b, c) {
        if (b = b || {}, this.options.fills) {
            var d = "<dl>",
                e = "";
            b.legendTitle && (d = "<h2>" + b.legendTitle + "</h2>" + d);
            for (var f in this.options.fills) {
                if ("defaultFill" === f) {
                    if (!b.defaultFillName) continue;
                    e = b.defaultFillName
                } else e = b.labels && b.labels[f] ? b.labels[f] : f + ": ";
                d += "<dt>" + e + "</dt>", d += '<dd style="background-color:' + this.options.fills[f] + '">&nbsp;</dd>'
            }
            d += "</dl>";
            n.select(this.options.element).append("div").attr("class", "datamaps-legend").html(d)
        }
    }

    function h(a, b) {
        var c = n.geo.graticule();
        this.svg.insert("path", ".datamaps-subunits").datum(c).attr("class", "datamaps-graticule").attr("d", this.path)
    }

    function i(b, c, d) {
        var e = this,
            f = this.svg;
        if (!c || c && !c.slice) throw "Datamaps Error - arcs must be an array";
        for (var g = 0; g < c.length; g++) c[g] = l(c[g], c[g].options), delete c[g].options;
        "undefined" == typeof d && (d = p.arcConfig);
        var h = b.selectAll("path.datamaps-arc").data(c, JSON.stringify),
            i = n.geo.path().projection(e.projection);
        h.enter().append("svg:path").attr("class", "datamaps-arc").style("stroke-linecap", "round").style("stroke", function(b) {
            return a(b.strokeColor, d.strokeColor, b)
        }).style("fill", "none").style("stroke-width", function(b) {
            return a(b.strokeWidth, d.strokeWidth, b)
        }).attr("d", function(b) {
            var c, g;
            if ("string" == typeof b.origin) switch (b.origin) {
                case "CAN":
                    c = e.latLngToXY(56.624472, -114.665293);
                    break;
                case "CHL":
                    c = e.latLngToXY(-33.44889, -70.669265);
                    break;
                case "IDN":
                    c = e.latLngToXY(-6.208763, 106.845599);
                    break;
                case "JPN":
                    c = e.latLngToXY(35.689487, 139.691706);
                    break;
                case "MYS":
                    c = e.latLngToXY(3.139003, 101.686855);
                    break;
                case "NOR":
                    c = e.latLngToXY(59.913869, 10.752245);
                    break;
                case "USA":
                    c = e.latLngToXY(41.140276, -100.760145);
                    break;
                case "VNM":
                    c = e.latLngToXY(21.027764, 105.83416);
                    break;
                default:
                    c = e.path.centroid(f.select("path." + b.origin).data()[0])
            } else c = e.latLngToXY(a(b.origin.latitude, b), a(b.origin.longitude, b));
            if ("string" == typeof b.destination) switch (b.destination) {
                case "CAN":
                    g = e.latLngToXY(56.624472, -114.665293);
                    break;
                case "CHL":
                    g = e.latLngToXY(-33.44889, -70.669265);
                    break;
                case "IDN":
                    g = e.latLngToXY(-6.208763, 106.845599);
                    break;
                case "JPN":
                    g = e.latLngToXY(35.689487, 139.691706);
                    break;
                case "MYS":
                    g = e.latLngToXY(3.139003, 101.686855);
                    break;
                case "NOR":
                    g = e.latLngToXY(59.913869, 10.752245);
                    break;
                case "USA":
                    g = e.latLngToXY(41.140276, -100.760145);
                    break;
                case "VNM":
                    g = e.latLngToXY(21.027764, 105.83416);
                    break;
                default:
                    g = e.path.centroid(f.select("path." + b.destination).data()[0])
            } else g = e.latLngToXY(a(b.destination.latitude, b), a(b.destination.longitude, b));
            var h = [(c[0] + g[0]) / 2, (c[1] + g[1]) / 2];
            if (d.greatArc) {
                var j = n.geo.greatArc().source(function(b) {
                    return [a(b.origin.longitude, b), a(b.origin.latitude, b)]
                }).target(function(b) {
                    return [a(b.destination.longitude, b), a(b.destination.latitude, b)]
                });
                return i(j(b))
            }
            var k = a(b.arcSharpness, d.arcSharpness, b);
            return "M" + c[0] + "," + c[1] + "S" + (h[0] + 50 * k) + "," + (h[1] - 75 * k) + "," + g[0] + "," + g[1]
        }).attr("data-info", function(a) {
            return JSON.stringify(a)
        }).on("mouseover", function(a) {
            var b = n.select(this);
            d.popupOnHover && e.updatePopup(b, a, d, f)
        }).on("mouseout", function(a) {
            n.select(this);
            n.selectAll(".datamaps-hoverover").style("display", "none")
        }).transition().delay(100).style("fill", function(b) {
            var c = this.getTotalLength();
            return this.style.transition = this.style.WebkitTransition = "none", this.style.strokeDasharray = c + " " + c, this.style.strokeDashoffset = c, this.getBoundingClientRect(), this.style.transition = this.style.WebkitTransition = "stroke-dashoffset " + a(b.animationSpeed, d.animationSpeed, b) + "ms ease-out", this.style.strokeDashoffset = "0", "none"
        }), h.exit().transition().style("opacity", 0).remove()
    }

    function j(a, b) {
        var c = this;
        b = b || {};
        var d = this.projection([-67.707617, 42.722131]);
        this.svg.selectAll(".datamaps-subunit").attr("data-foo", function(e) {
            var f = c.path.centroid(e),
                g = 7.5,
                h = 5;
            ["FL", "KY", "MI"].indexOf(e.id) > -1 && (g = -2.5), "NY" === e.id && (g = -1), "MI" === e.id && (h = 18), "LA" === e.id && (g = 13);
            var i, j;
            i = f[0] - g, j = f[1] + h;
            var k = ["VT", "NH", "MA", "RI", "CT", "NJ", "DE", "MD", "DC"].indexOf(e.id);
            if (k > -1) {
                var l = d[1];
                i = d[0], j = l + k * (2 + (b.fontSize || 12)), a.append("line").attr("x1", i - 3).attr("y1", j - 5).attr("x2", f[0]).attr("y2", f[1]).style("stroke", b.labelColor || "#000").style("stroke-width", b.lineWidth || 1)
            }
            return a.append("text").attr("x", i).attr("y", j).style("font-size", (b.fontSize || 10) + "px").style("font-family", b.fontFamily || "Verdana").style("fill", b.labelColor || "#000").text(function() {
                return b.customLabelText && b.customLabelText[e.id] ? b.customLabelText[e.id] : e.id
            }), "bar"
        })
    }

    function k(b, c, d) {
        function e(a) {
            return "undefined" != typeof a && "undefined" != typeof a.latitude && "undefined" != typeof a.longitude
        }
        var f = this,
            g = this.options.fills,
            h = this.options.filters,
            i = this.svg;
        if (!c || c && !c.slice) throw "Datamaps Error - bubbles must be an array";
        var j = b.selectAll("circle.datamaps-bubble").data(c, d.key);
        j.enter().append("svg:circle").attr("class", "datamaps-bubble").attr("cx", function(a) {
            var b;
            if (e(a) ? b = f.latLngToXY(a.latitude, a.longitude) : a.centered && (b = "USA" === a.centered ? f.projection([-98.58333, 39.83333]) : f.path.centroid(i.select("path." + a.centered).data()[0])), b) return b[0]
        }).attr("cy", function(a) {
            var b;
            if (e(a) ? b = f.latLngToXY(a.latitude, a.longitude) : a.centered && (b = "USA" === a.centered ? f.projection([-98.58333, 39.83333]) : f.path.centroid(i.select("path." + a.centered).data()[0])), b) return b[1]
        }).attr("r", function(b) {
            return d.animate ? 0 : a(b.radius, d.radius, b)
        }).attr("data-info", function(a) {
            return JSON.stringify(a)
        }).attr("filter", function(b) {
            var c = h[a(b.filterKey, d.filterKey, b)];
            if (c) return c
        }).style("stroke", function(b) {
            return a(b.borderColor, d.borderColor, b)
        }).style("stroke-width", function(b) {
            return a(b.borderWidth, d.borderWidth, b)
        }).style("stroke-opacity", function(b) {
            return a(b.borderOpacity, d.borderOpacity, b)
        }).style("fill-opacity", function(b) {
            return a(b.fillOpacity, d.fillOpacity, b)
        }).style("fill", function(b) {
            var c = g[a(b.fillKey, d.fillKey, b)];
            return c || g.defaultFill
        }).on("mouseover", function(b) {
            var c = n.select(this);
            if (d.highlightOnHover) {
                var e = {
                    fill: c.style("fill"),
                    stroke: c.style("stroke"),
                    "stroke-width": c.style("stroke-width"),
                    "fill-opacity": c.style("fill-opacity")
                };
                c.style("fill", a(b.highlightFillColor, d.highlightFillColor, b)).style("stroke", a(b.highlightBorderColor, d.highlightBorderColor, b)).style("stroke-width", a(b.highlightBorderWidth, d.highlightBorderWidth, b)).style("stroke-opacity", a(b.highlightBorderOpacity, d.highlightBorderOpacity, b)).style("fill-opacity", a(b.highlightFillOpacity, d.highlightFillOpacity, b)).attr("data-previousAttributes", JSON.stringify(e))
            }
            d.popupOnHover && f.updatePopup(c, b, d, i)
        }).on("mouseout", function(a) {
            var b = n.select(this);
            if (d.highlightOnHover) {
                var c = JSON.parse(b.attr("data-previousAttributes"));
                for (var e in c) b.style(e, c[e])
            }
            n.selectAll(".datamaps-hoverover").style("display", "none")
        }), j.transition().duration(400).attr("r", function(b) {
            return a(b.radius, d.radius, b)
        }).transition().duration(0).attr("data-info", function(a) {
            return JSON.stringify(a)
        }), j.exit().transition().delay(d.exitDelay).attr("r", 0).remove()
    }

    function l(a) {
        return Array.prototype.slice.call(arguments, 1).forEach(function(b) {
            if (b)
                for (var c in b) null == a[c] && ("function" == typeof b[c] ? a[c] = b[c] : a[c] = JSON.parse(JSON.stringify(b[c])))
        }), a
    }

    function m(a) {
        if ("undefined" == typeof n || "undefined" == typeof o) throw new Error("Include d3.js (v3.0.3 or greater) and topojson on this page before creating a new map");
        return this.options = l(a, p), this.options.geographyConfig = l(a.geographyConfig, p.geographyConfig), this.options.projectionConfig = l(a.projectionConfig, p.projectionConfig), this.options.bubblesConfig = l(a.bubblesConfig, p.bubblesConfig), this.options.arcConfig = l(a.arcConfig, p.arcConfig), n.select(this.options.element).select("svg").length > 0 && b.call(this, this.options.element, this.options.height, this.options.width), this.addPlugin("bubbles", k), this.addPlugin("legend", g), this.addPlugin("arc", i), this.addPlugin("labels", j), this.addPlugin("graticule", h), this.options.disableDefaultStyles || d(), this.draw()
    }
    var n = window.d3,
        o = window.topojson,
        p = {
            scope: "world",
            responsive: !1,
            aspectRatio: .5625,
            setProjection: c,
            projection: "equirectangular",
            dataType: "json",
            data: {},
            done: function() {},
            fills: {
                defaultFill: "#ABDDA4"
            },
            filters: {},
            geographyConfig: {
                dataUrl: null,
                hideAntarctica: !0,
                hideHawaiiAndAlaska: !1,
                borderWidth: 1,
                borderOpacity: 1,
                borderColor: "#FDFDFD",
                popupTemplate: function(a, b) {
                    return '<div class="hoverinfo"><strong>' + a.properties.name + "</strong></div>"
                },
                popupOnHover: !0,
                highlightOnHover: !0,
                highlightFillColor: "#FC8D59",
                highlightBorderColor: "rgba(250, 15, 160, 0.2)",
                highlightBorderWidth: 2,
                highlightBorderOpacity: 1
            },
            projectionConfig: {
                rotation: [97, 0]
            },
            bubblesConfig: {
                borderWidth: 2,
                borderOpacity: 1,
                borderColor: "#FFFFFF",
                popupOnHover: !0,
                radius: null,
                popupTemplate: function(a, b) {
                    return '<div class="hoverinfo"><strong>' + b.name + "</strong></div>"
                },
                fillOpacity: .75,
                animate: !0,
                highlightOnHover: !0,
                highlightFillColor: "#FC8D59",
                highlightBorderColor: "rgba(250, 15, 160, 0.2)",
                highlightBorderWidth: 2,
                highlightBorderOpacity: 1,
                highlightFillOpacity: .85,
                exitDelay: 100,
                key: JSON.stringify
            },
            arcConfig: {
                strokeColor: "#DD1C77",
                strokeWidth: 1,
                arcSharpness: 1,
                animationSpeed: 600,
                popupOnHover: !1,
                popupTemplate: function(a, b) {
                    return b.origin && b.destination && b.origin.latitude && b.origin.longitude && b.destination.latitude && b.destination.longitude ? '<div class="hoverinfo"><strong>Arc</strong><br>Origin: ' + JSON.stringify(b.origin) + "<br>Destination: " + JSON.stringify(b.destination) + "</div>" : b.origin && b.destination ? '<div class="hoverinfo"><strong>Arc</strong><br>' + b.origin + " -> " + b.destination + "</div>" : ""
                }
            }
        };
    m.prototype.resize = function() {
        var a = this,
            b = a.options;
        if (b.responsive) {
            var c = b.element.clientWidth,
                d = n.select(b.element).select("svg").attr("data-width");
            n.select(b.element).select("svg").selectAll("g").attr("transform", "scale(" + c / d + ")")
        }
    }, m.prototype.draw = function() {
        function a(a) {
            b.options.dataUrl && n[b.options.dataType](b.options.dataUrl, function(a) {
                if ("csv" === b.options.dataType && a && a.slice) {
                    for (var c = {}, d = 0; d < a.length; d++) c[a[d].id] = a[d];
                    a = c
                }
                Datamaps.prototype.updateChoropleth.call(b, a)
            }), e.call(b, a), f.call(b), (b.options.geographyConfig.popupOnHover || b.options.bubblesConfig.popupOnHover) && (hoverover = n.select(b.options.element).append("div").attr("class", "datamaps-hoverover").style("z-index", 10001).style("position", "absolute")), b.options.done(b)
        }
        var b = this,
            c = b.options,
            d = c.setProjection.apply(this, [c.element, c]);
        return this.path = d.path, this.projection = d.projection, c.geographyConfig.dataUrl ? n.json(c.geographyConfig.dataUrl, function(c, d) {
            if (c) throw new Error(c);
            b.customTopo = d, a(d)
        }) : a(this[c.scope + "Topo"] || c.geographyConfig.dataJson), this
    }, m.prototype.worldTopo = "__WORLD__", m.prototype.abwTopo = "__ABW__", m.prototype.afgTopo = "__AFG__", m.prototype.agoTopo = "__AGO__", m.prototype.aiaTopo = "__AIA__", m.prototype.albTopo = "__ALB__", m.prototype.aldTopo = "__ALD__", m.prototype.andTopo = "__AND__", m.prototype.areTopo = "__ARE__", m.prototype.argTopo = "__ARG__", m.prototype.armTopo = "__ARM__", m.prototype.asmTopo = "__ASM__", m.prototype.ataTopo = "__ATA__", m.prototype.atcTopo = "__ATC__", m.prototype.atfTopo = "__ATF__", m.prototype.atgTopo = "__ATG__", m.prototype.ausTopo = "__AUS__", m.prototype.autTopo = "__AUT__", m.prototype.azeTopo = "__AZE__", m.prototype.bdiTopo = "__BDI__", m.prototype.belTopo = "__BEL__", m.prototype.benTopo = "__BEN__", m.prototype.bfaTopo = "__BFA__", m.prototype.bgdTopo = "__BGD__", m.prototype.bgrTopo = "__BGR__", m.prototype.bhrTopo = "__BHR__", m.prototype.bhsTopo = "__BHS__", m.prototype.bihTopo = "__BIH__", m.prototype.bjnTopo = "__BJN__", m.prototype.blmTopo = "__BLM__", m.prototype.blrTopo = "__BLR__", m.prototype.blzTopo = "__BLZ__", m.prototype.bmuTopo = "__BMU__", m.prototype.bolTopo = "__BOL__", m.prototype.braTopo = "__BRA__", m.prototype.brbTopo = "__BRB__", m.prototype.brnTopo = "__BRN__", m.prototype.btnTopo = "__BTN__", m.prototype.norTopo = "__NOR__", m.prototype.bwaTopo = "__BWA__", m.prototype.cafTopo = "__CAF__", m.prototype.canTopo = "__CAN__", m.prototype.cheTopo = "__CHE__", m.prototype.chlTopo = "__CHL__", m.prototype.chnTopo = "__CHN__", m.prototype.civTopo = "__CIV__", m.prototype.clpTopo = "__CLP__", m.prototype.cmrTopo = "__CMR__", m.prototype.codTopo = "__COD__", m.prototype.cogTopo = "__COG__", m.prototype.cokTopo = "__COK__", m.prototype.colTopo = "__COL__", m.prototype.comTopo = "__COM__", m.prototype.cpvTopo = "__CPV__", m.prototype.criTopo = "__CRI__", m.prototype.csiTopo = "__CSI__", m.prototype.cubTopo = "__CUB__", m.prototype.cuwTopo = "__CUW__", m.prototype.cymTopo = "__CYM__", m.prototype.cynTopo = "__CYN__", m.prototype.cypTopo = "__CYP__", m.prototype.czeTopo = "__CZE__", m.prototype.deuTopo = "__DEU__", m.prototype.djiTopo = "__DJI__", m.prototype.dmaTopo = "__DMA__", m.prototype.dnkTopo = "__DNK__", m.prototype.domTopo = "__DOM__", m.prototype.dzaTopo = "__DZA__", m.prototype.ecuTopo = "__ECU__", m.prototype.egyTopo = "__EGY__", m.prototype.eriTopo = "__ERI__", m.prototype.esbTopo = "__ESB__", m.prototype.espTopo = "__ESP__", m.prototype.estTopo = "__EST__", m.prototype.ethTopo = "__ETH__", m.prototype.finTopo = "__FIN__", m.prototype.fjiTopo = "__FJI__", m.prototype.flkTopo = "__FLK__", m.prototype.fraTopo = "__FRA__", m.prototype.froTopo = "__FRO__", m.prototype.fsmTopo = "__FSM__", m.prototype.gabTopo = "__GAB__", m.prototype.psxTopo = "__PSX__", m.prototype.gbrTopo = "__GBR__", m.prototype.geoTopo = "__GEO__", m.prototype.ggyTopo = "__GGY__", m.prototype.ghaTopo = "__GHA__", m.prototype.gibTopo = "__GIB__", m.prototype.ginTopo = "__GIN__", m.prototype.gmbTopo = "__GMB__", m.prototype.gnbTopo = "__GNB__", m.prototype.gnqTopo = "__GNQ__", m.prototype.grcTopo = "__GRC__", m.prototype.grdTopo = "__GRD__", m.prototype.grlTopo = "__GRL__", m.prototype.gtmTopo = "__GTM__", m.prototype.gumTopo = "__GUM__", m.prototype.guyTopo = "__GUY__", m.prototype.hkgTopo = "__HKG__", m.prototype.hmdTopo = "__HMD__", m.prototype.hndTopo = "__HND__", m.prototype.hrvTopo = "__HRV__", m.prototype.htiTopo = "__HTI__", m.prototype.hunTopo = "__HUN__", m.prototype.idnTopo = "__IDN__", m.prototype.imnTopo = "__IMN__", m.prototype.indTopo = "__IND__", m.prototype.ioaTopo = "__IOA__", m.prototype.iotTopo = "__IOT__", m.prototype.irlTopo = "__IRL__", m.prototype.irnTopo = "__IRN__", m.prototype.irqTopo = "__IRQ__", m.prototype.islTopo = "__ISL__", m.prototype.isrTopo = "__ISR__", m.prototype.itaTopo = "__ITA__", m.prototype.jamTopo = "__JAM__", m.prototype.jeyTopo = "__JEY__", m.prototype.jorTopo = "__JOR__", m.prototype.jpnTopo = "__JPN__", m.prototype.kabTopo = "__KAB__", m.prototype.kasTopo = "__KAS__", m.prototype.kazTopo = "__KAZ__", m.prototype.kenTopo = "__KEN__", m.prototype.kgzTopo = "__KGZ__", m.prototype.khmTopo = "__KHM__", m.prototype.kirTopo = "__KIR__", m.prototype.knaTopo = "__KNA__", m.prototype.korTopo = "__KOR__", m.prototype.kosTopo = "__KOS__", m.prototype.kwtTopo = "__KWT__", m.prototype.laoTopo = "__LAO__", m.prototype.lbnTopo = "__LBN__", m.prototype.lbrTopo = "__LBR__", m.prototype.lbyTopo = "__LBY__", m.prototype.lcaTopo = "__LCA__", m.prototype.lieTopo = "__LIE__", m.prototype.lkaTopo = "__LKA__", m.prototype.lsoTopo = "__LSO__", m.prototype.ltuTopo = "__LTU__", m.prototype.luxTopo = "__LUX__", m.prototype.lvaTopo = "__LVA__", m.prototype.macTopo = "__MAC__", m.prototype.mafTopo = "__MAF__", m.prototype.marTopo = "__MAR__", m.prototype.mcoTopo = "__MCO__", m.prototype.mdaTopo = "__MDA__", m.prototype.mdgTopo = "__MDG__", m.prototype.mdvTopo = "__MDV__", m.prototype.mexTopo = "__MEX__", m.prototype.mhlTopo = "__MHL__", m.prototype.mkdTopo = "__MKD__", m.prototype.mliTopo = "__MLI__", m.prototype.mltTopo = "__MLT__", m.prototype.mmrTopo = "__MMR__", m.prototype.mneTopo = "__MNE__", m.prototype.mngTopo = "__MNG__", m.prototype.mnpTopo = "__MNP__", m.prototype.mozTopo = "__MOZ__", m.prototype.mrtTopo = "__MRT__", m.prototype.msrTopo = "__MSR__", m.prototype.musTopo = "__MUS__", m.prototype.mwiTopo = "__MWI__", m.prototype.mysTopo = "__MYS__", m.prototype.namTopo = "__NAM__", m.prototype.nclTopo = "__NCL__", m.prototype.nerTopo = "__NER__", m.prototype.nfkTopo = "__NFK__", m.prototype.ngaTopo = "__NGA__", m.prototype.nicTopo = "__NIC__", m.prototype.niuTopo = "__NIU__", m.prototype.nldTopo = "__NLD__", m.prototype.nplTopo = "__NPL__", m.prototype.nruTopo = "__NRU__", m.prototype.nulTopo = "__NUL__", m.prototype.nzlTopo = "__NZL__", m.prototype.omnTopo = "__OMN__", m.prototype.pakTopo = "__PAK__", m.prototype.panTopo = "__PAN__", m.prototype.pcnTopo = "__PCN__", m.prototype.perTopo = "__PER__", m.prototype.pgaTopo = "__PGA__", m.prototype.phlTopo = "__PHL__", m.prototype.plwTopo = "__PLW__", m.prototype.pngTopo = "__PNG__", m.prototype.polTopo = "__POL__", m.prototype.priTopo = "__PRI__", m.prototype.prkTopo = "__PRK__", m.prototype.prtTopo = "__PRT__", m.prototype.pryTopo = "__PRY__", m.prototype.pyfTopo = "__PYF__", m.prototype.qatTopo = "__QAT__", m.prototype.rouTopo = "__ROU__", m.prototype.rusTopo = "__RUS__", m.prototype.rwaTopo = "__RWA__", m.prototype.sahTopo = "__SAH__", m.prototype.sauTopo = "__SAU__", m.prototype.scrTopo = "__SCR__", m.prototype.sdnTopo = "__SDN__";
    m.prototype.sdsTopo = "__SDS__";
    m.prototype.senTopo = "__SEN__", m.prototype.serTopo = "__SER__", m.prototype.sgpTopo = "__SGP__", m.prototype.sgsTopo = "__SGS__", m.prototype.shnTopo = "__SHN__", m.prototype.slbTopo = "__SLB__", m.prototype.sleTopo = "__SLE__", m.prototype.slvTopo = "__SLV__", m.prototype.smrTopo = "__SMR__", m.prototype.solTopo = "__SOL__", m.prototype.somTopo = "__SOM__", m.prototype.spmTopo = "__SPM__", m.prototype.srbTopo = "__SRB__", m.prototype.stpTopo = "__STP__", m.prototype.surTopo = "__SUR__", m.prototype.svkTopo = "__SVK__", m.prototype.svnTopo = "__SVN__", m.prototype.sweTopo = "__SWE__", m.prototype.swzTopo = "__SWZ__", m.prototype.sxmTopo = "__SXM__", m.prototype.sycTopo = "__SYC__", m.prototype.syrTopo = "__SYR__", m.prototype.tcaTopo = "__TCA__", m.prototype.tcdTopo = "__TCD__", m.prototype.tgoTopo = "__TGO__", m.prototype.thaTopo = "__THA__", m.prototype.tjkTopo = "__TJK__", m.prototype.tkmTopo = "__TKM__", m.prototype.tlsTopo = "__TLS__", m.prototype.tonTopo = "__TON__", m.prototype.ttoTopo = "__TTO__", m.prototype.tunTopo = "__TUN__", m.prototype.turTopo = "__TUR__", m.prototype.tuvTopo = "__TUV__", m.prototype.twnTopo = "__TWN__", m.prototype.tzaTopo = "__TZA__", m.prototype.ugaTopo = "__UGA__", m.prototype.ukrTopo = "__UKR__", m.prototype.umiTopo = "__UMI__", m.prototype.uryTopo = "__URY__", m.prototype.usaTopo = {
        type: "Topology",
        transform: {
            scale: [.03514630243024302, .005240860686068607],
            translate: [-178.123152, 18.948267]
        },
        objects: {
            usa: {
                type: "GeometryCollection",
                geometries: [{
                    type: "Polygon",
                    id: "AL",
                    arcs: [
                        [0, 1, 2, 3, 4]
                    ],
                    properties: {
                        name: "Alabama"
                    }
                }, {
                    type: "MultiPolygon",
                    id: "AK",
                    arcs: [
                        [
                            [5]
                        ],
                        [
                            [6]
                        ],
                        [
                            [7]
                        ],
                        [
                            [8]
                        ],
                        [
                            [9]
                        ],
                        [
                            [10]
                        ],
                        [
                            [11]
                        ],
                        [
                            [12]
                        ],
                        [
                            [13]
                        ],
                        [
                            [14]
                        ],
                        [
                            [15]
                        ],
                        [
                            [16]
                        ],
                        [
                            [17]
                        ],
                        [
                            [18]
                        ],
                        [
                            [19]
                        ],
                        [
                            [20]
                        ],
                        [
                            [21]
                        ],
                        [
                            [22]
                        ],
                        [
                            [23]
                        ],
                        [
                            [24]
                        ],
                        [
                            [25]
                        ],
                        [
                            [26]
                        ],
                        [
                            [27]
                        ],
                        [
                            [28]
                        ],
                        [
                            [29]
                        ],
                        [
                            [30]
                        ],
                        [
                            [31]
                        ],
                        [
                            [32]
                        ],
                        [
                            [33]
                        ],
                        [
                            [34]
                        ],
                        [
                            [35]
                        ],
                        [
                            [36]
                        ],
                        [
                            [37]
                        ],
                        [
                            [38]
                        ],
                        [
                            [39]
                        ],
                        [
                            [40]
                        ],
                        [
                            [41]
                        ],
                        [
                            [42]
                        ],
                        [
                            [43]
                        ]
                    ],
                    properties: {
                        name: "Alaska"
                    }
                }, {
                    type: "Polygon",
                    id: "AZ",
                    arcs: [
                        [44, 45, 46, 47, 48]
                    ],
                    properties: {
                        name: "Arizona"
                    }
                }, {
                    type: "Polygon",
                    id: "AR",
                    arcs: [
                        [49, 50, 51, 52, 53, 54]
                    ],
                    properties: {
                        name: "Arkansas"
                    }
                }, {
                    type: "Polygon",
                    id: "CA",
                    arcs: [
                        [55, -47, 56, 57]
                    ],
                    properties: {
                        name: "California"
                    }
                }, {
                    type: "Polygon",
                    id: "CO",
                    arcs: [
                        [58, 59, 60, 61, 62, 63]
                    ],
                    properties: {
                        name: "Colorado"
                    }
                }, {
                    type: "Polygon",
                    id: "CT",
                    arcs: [
                        [64, 65, 66, 67]
                    ],
                    properties: {
                        name: "Connecticut"
                    }
                }, {
                    type: "Polygon",
                    id: "DE",
                    arcs: [
                        [68, 69, 70, 71]
                    ],
                    properties: {
                        name: "Delaware"
                    }
                }, {
                    type: "Polygon",
                    id: "DC",
                    arcs: [
                        [72, 73]
                    ],
                    properties: {
                        name: "District of Columbia"
                    }
                }, {
                    type: "Polygon",
                    id: "FL",
                    arcs: [
                        [74, 75, -2]
                    ],
                    properties: {
                        name: "Florida"
                    }
                }, {
                    type: "Polygon",
                    id: "GA",
                    arcs: [
                        [76, 77, -75, -1, 78, 79]
                    ],
                    properties: {
                        name: "Georgia"
                    }
                }, {
                    type: "MultiPolygon",
                    id: "HI",
                    arcs: [
                        [
                            [80]
                        ],
                        [
                            [81]
                        ],
                        [
                            [82]
                        ],
                        [
                            [83]
                        ],
                        [
                            [84]
                        ]
                    ],
                    properties: {
                        name: "Hawaii"
                    }
                }, {
                    type: "Polygon",
                    id: "ID",
                    arcs: [
                        [85, 86, 87, 88, 89, 90, 91]
                    ],
                    properties: {
                        name: "Idaho"
                    }
                }, {
                    type: "Polygon",
                    id: "IL",
                    arcs: [
                        [92, 93, 94, 95, 96, 97]
                    ],
                    properties: {
                        name: "Illinois"
                    }
                }, {
                    type: "Polygon",
                    id: "IN",
                    arcs: [
                        [98, 99, -95, 100, 101]
                    ],
                    properties: {
                        name: "Indiana"
                    }
                }, {
                    type: "Polygon",
                    id: "IA",
                    arcs: [
                        [102, -98, 103, 104, 105, 106]
                    ],
                    properties: {
                        name: "Iowa"
                    }
                }, {
                    type: "Polygon",
                    id: "KS",
                    arcs: [
                        [107, 108, -60, 109]
                    ],
                    properties: {
                        name: "Kansas"
                    }
                }, {
                    type: "Polygon",
                    id: "KY",
                    arcs: [
                        [110, 111, 112, 113, -96, -100, 114]
                    ],
                    properties: {
                        name: "Kentucky"
                    }
                }, {
                    type: "Polygon",
                    id: "LA",
                    arcs: [
                        [115, 116, 117, -52]
                    ],
                    properties: {
                        name: "Louisiana"
                    }
                }, {
                    type: "Polygon",
                    id: "ME",
                    arcs: [
                        [118, 119]
                    ],
                    properties: {
                        name: "Maine"
                    }
                }, {
                    type: "MultiPolygon",
                    id: "MD",
                    arcs: [
                        [
                            [120]
                        ],
                        [
                            [-71, 121, 122, 123, 124, -74, 125, 126, 127]
                        ]
                    ],
                    properties: {
                        name: "Maryland"
                    }
                }, {
                    type: "Polygon",
                    id: "MA",
                    arcs: [
                        [128, 129, 130, 131, -68, 132, 133, 134]
                    ],
                    properties: {
                        name: "Massachusetts"
                    }
                }, {
                    type: "MultiPolygon",
                    id: "MI",
                    arcs: [
                        [
                            [-102, 135, 136]
                        ],
                        [
                            [137]
                        ],
                        [
                            [138, 139]
                        ],
                        [
                            [140]
                        ]
                    ],
                    properties: {
                        name: "Michigan"
                    }
                }, {
                    type: "Polygon",
                    id: "MN",
                    arcs: [
                        [-107, 141, 142, 143, 144]
                    ],
                    properties: {
                        name: "Minnesota"
                    }
                }, {
                    type: "Polygon",
                    id: "MS",
                    arcs: [
                        [-4, 145, -116, -51, 146]
                    ],
                    properties: {
                        name: "Mississippi"
                    }
                }, {
                    type: "Polygon",
                    id: "MO",
                    arcs: [
                        [-97, -114, 147, -55, 148, -108, 149, -104]
                    ],
                    properties: {
                        name: "Missouri"
                    }
                }, {
                    type: "Polygon",
                    id: "MT",
                    arcs: [
                        [150, 151, -92, 152, 153]
                    ],
                    properties: {
                        name: "Montana"
                    }
                }, {
                    type: "Polygon",
                    id: "NE",
                    arcs: [
                        [-105, -150, -110, -59, 154, 155]
                    ],
                    properties: {
                        name: "Nebraska"
                    }
                }, {
                    type: "Polygon",
                    id: "NV",
                    arcs: [
                        [156, -48, -56, 157, -88]
                    ],
                    properties: {
                        name: "Nevada"
                    }
                }, {
                    type: "Polygon",
                    id: "NH",
                    arcs: [
                        [-135, 158, 159, -120, 160]
                    ],
                    properties: {
                        name: "New Hampshire"
                    }
                }, {
                    type: "Polygon",
                    id: "NJ",
                    arcs: [
                        [161, -69, 162, 163]
                    ],
                    properties: {
                        name: "New Jersey"
                    }
                }, {
                    type: "Polygon",
                    id: "NM",
                    arcs: [
                        [164, 165, 166, -45, -62]
                    ],
                    properties: {
                        name: "New Mexico"
                    }
                }, {
                    type: "Polygon",
                    id: "NY",
                    arcs: [
                        [-133, -67, 167, -164, 168, 169, 170]
                    ],
                    properties: {
                        name: "New York"
                    }
                }, {
                    type: "Polygon",
                    id: "NC",
                    arcs: [
                        [171, 172, -80, 173, 174]
                    ],
                    properties: {
                        name: "North Carolina"
                    }
                }, {
                    type: "Polygon",
                    id: "ND",
                    arcs: [
                        [175, -154, 176, -143]
                    ],
                    properties: {
                        name: "North Dakota"
                    }
                }, {
                    type: "Polygon",
                    id: "OH",
                    arcs: [
                        [177, -115, -99, -137, 178, 179]
                    ],
                    properties: {
                        name: "Ohio"
                    }
                }, {
                    type: "Polygon",
                    id: "OK",
                    arcs: [
                        [-149, -54, 180, -165, -61, -109]
                    ],
                    properties: {
                        name: "Oklahoma"
                    }
                }, {
                    type: "Polygon",
                    id: "OR",
                    arcs: [
                        [-89, -158, -58, 181, 182]
                    ],
                    properties: {
                        name: "Oregon"
                    }
                }, {
                    type: "Polygon",
                    id: "PA",
                    arcs: [
                        [-163, -72, -128, 183, -180, 184, -169]
                    ],
                    properties: {
                        name: "Pennsylvania"
                    }
                }, {
                    type: "MultiPolygon",
                    id: "RI",
                    arcs: [
                        [
                            [185, -130]
                        ],
                        [
                            [186, -65, -132]
                        ]
                    ],
                    properties: {
                        name: "Rhode Island"
                    }
                }, {
                    type: "Polygon",
                    id: "SC",
                    arcs: [
                        [187, -77, -173]
                    ],
                    properties: {
                        name: "South Carolina"
                    }
                }, {
                    type: "Polygon",
                    id: "SD",
                    arcs: [
                        [-142, -106, -156, 188, -151, -176]
                    ],
                    properties: {
                        name: "South Dakota"
                    }
                }, {
                    type: "Polygon",
                    id: "TN",
                    arcs: [
                        [189, -174, -79, -5, -147, -50, -148, -113]
                    ],
                    properties: {
                        name: "Tennessee"
                    }
                }, {
                    type: "Polygon",
                    id: "TX",
                    arcs: [
                        [-53, -118, 190, -166, -181]
                    ],
                    properties: {
                        name: "Texas"
                    }
                }, {
                    type: "Polygon",
                    id: "UT",
                    arcs: [
                        [191, -63, -49, -157, -87]
                    ],
                    properties: {
                        name: "Utah"
                    }
                }, {
                    type: "Polygon",
                    id: "VT",
                    arcs: [
                        [-134, -171, 192, -159]
                    ],
                    properties: {
                        name: "Vermont"
                    }
                }, {
                    type: "MultiPolygon",
                    id: "VA",
                    arcs: [
                        [
                            [193, -123]
                        ],
                        [
                            [120]
                        ],
                        [
                            [-126, -73, -125, 194, -175, -190, -112, 195]
                        ]
                    ],
                    properties: {
                        name: "Virginia"
                    }
                }, {
                    type: "MultiPolygon",
                    id: "WA",
                    arcs: [
                        [
                            [-183, 196, -90]
                        ],
                        [
                            [197]
                        ],
                        [
                            [198]
                        ]
                    ],
                    properties: {
                        name: "Washington"
                    }
                }, {
                    type: "Polygon",
                    id: "WV",
                    arcs: [
                        [-184, -127, -196, -111, -178]
                    ],
                    properties: {
                        name: "West Virginia"
                    }
                }, {
                    type: "Polygon",
                    id: "WI",
                    arcs: [
                        [199, -93, -103, -145, 200, -140]
                    ],
                    properties: {
                        name: "Wisconsin"
                    }
                }, {
                    type: "Polygon",
                    id: "WY",
                    arcs: [
                        [-189, -155, -64, -192, -86, -152]
                    ],
                    properties: {
                        name: "Wyoming"
                    }
                }]
            }
        },
        arcs: [
            [
                [2632, 3060],
                [5, -164],
                [7, -242],
                [4, -53],
                [3, -30],
                [-2, -19],
                [4, -11],
                [-5, -25],
                [0, -24],
                [-2, -32],
                [2, -57],
                [-2, -51],
                [3, -52]
            ],
            [
                [2649, 2300],
                [-14, -1],
                [-59, 0],
                [-1, -25],
                [6, -37],
                [-1, -31],
                [2, -16],
                [-4, -28]
            ],
            [
                [2578, 2162],
                [-4, -6],
                [-7, 31],
                [-1, 47],
                [-2, 6],
                [-3, -36],
                [-1, -34],
                [-7, 9]
            ],
            [
                [2553, 2179],
                [-2, 291],
                [6, 363],
                [4, 209],
                [-3, 20]
            ],
            [
                [2558, 3062],
                [24, 1],
                [50, -3]
            ],
            [
                [1324, 6901],
                [1, 32],
                [6, -19],
                [-1, -32],
                [-8, 4],
                [2, 15]
            ],
            [
                [1317, 6960],
                [5, -23],
                [-3, -33],
                [-2, 11],
                [0, 45]
            ],
            [
                [1285, 7153],
                [6, 5],
                [3, -8],
                [-1, -28],
                [-6, -6],
                [-5, 17],
                [3, 20]
            ],
            [
                [1267, 7137],
                [12, -7],
                [3, -36],
                [13, -41],
                [4, -25],
                [0, -21],
                [3, -4],
                [1, -27],
                [5, -27],
                [0, -25],
                [3, 8],
                [2, -19],
                [1, -74],
                [-3, -17],
                [-7, 3],
                [-3, 38],
                [-2, -3],
                [-6, 28],
                [-2, -10],
                [-5, 10],
                [1, -28],
                [5, 7],
                [3, -10],
                [-2, -39],
                [-5, 4],
                [-9, 49],
                [-2, 25],
                [1, 26],
                [-7, -2],
                [0, 20],
                [5, 2],
                [5, 18],
                [-2, 31],
                [-6, 7],
                [-1, 50],
                [-2, 25],
                [-4, -18],
                [-2, 28],
                [4, 14],
                [-3, 32],
                [2, 8]
            ],
            [
                [1263, 6985],
                [5, -12],
                [4, 15],
                [4, -7],
                [-4, -28],
                [-6, 8],
                [-3, 24]
            ],
            [
                [1258, 7247],
                [-4, 19],
                [5, 13],
                [15, -18],
                [7, 1],
                [5, -36],
                [9, -29],
                [-1, -22],
                [-5, -11],
                [-6, 5],
                [-5, -14],
                [-6, 9],
                [-7, -9],
                [-1, 45],
                [0, 30],
                [-5, 1],
                [-1, 16]
            ],
            [
                [1252, 7162],
                [-4, 14],
                [-4, 32],
                [0, 24],
                [3, 11],
                [4, -11],
                [0, 20],
                [12, -35],
                [1, -33],
                [-4, -5],
                [-3, -37],
                [3, -11],
                [-3, -43],
                [-5, 9],
                [0, -27],
                [-3, 13],
                [-2, 54],
                [5, 25]
            ],
            [
                [1207, 7331],
                [8, 38],
                [3, -16],
                [7, -13],
                [6, -2],
                [0, -30],
                [6, -99],
                [0, -85],
                [-1, -22],
                [-4, 13],
                [-10, 84],
                [-7, 25],
                [3, 20],
                [-3, 48],
                [-8, 39]
            ],
            [
                [1235, 7494],
                [10, -15],
                [5, 2],
                [0, -14],
                [8, -52],
                [-5, 8],
                [-2, -18],
                [6, -27],
                [2, -48],
                [-6, -13],
                [-2, -16],
                [-10, -35],
                [-3, 1],
                [-1, 37],
                [2, 22],
                [-1, 32],
                [-3, 40],
                [0, 21],
                [-2, 51],
                [-4, 22],
                [-1, 38],
                [7, -36]
            ],
            [
                [1203, 7324],
                [4, 0],
                [4, -35],
                [-2, -24],
                [-6, -5],
                [0, 38],
                [0, 26]
            ],
            [
                [1207, 7331],
                [-5, 7],
                [-3, 26],
                [-6, 18],
                [-5, 37],
                [-6, 17],
                [1, 30],
                [4, 10],
                [1, 26],
                [3, -11],
                [8, -1],
                [6, 17],
                [8, -23],
                [-5, -26],
                [2, -9],
                [4, 28],
                [10, -9],
                [5, -21],
                [-3, -38],
                [3, -3],
                [3, -50],
                [-7, -7],
                [-14, 41],
                [0, -42],
                [-4, -17]
            ],
            [
                [883, 7871],
                [-12, -48],
                [-1, -19],
                [-9, -12],
                [2, 29],
                [10, 30],
                [7, 34],
                [3, -14]
            ],
            [
                [870, 7943],
                [-2, -39],
                [-4, -41],
                [-6, 14],
                [5, 47],
                [7, 19]
            ],
            [
                [863, 9788],
                [3, -8],
                [15, -9],
                [8, 5],
                [10, 0],
                [12, -7],
                [7, 4],
                [7, -15],
                [12, -18],
                [16, -4],
                [5, 10],
                [11, 6],
                [4, 14],
                [12, 2],
                [0, -9],
                [7, 5],
                [15, -15],
                [9, -24],
                [10, -11],
                [2, -11],
                [8, -2],
                [8, -18],
                [1, -11],
                [5, 9],
                [6, -7],
                [0, -1783],
                [13, -16],
                [2, 17],
                [14, -24],
                [8, 30],
                [18, 4],
                [-3, -52],
                [4, -17],
                [10, -17],
                [2, -27],
                [29, -101],
                [4, -63],
                [6, 17],
                [12, 31],
                [7, 1],
                [3, 23],
                [0, 34],
                [5, 0],
                [1, 31],
                [9, 7],
                [13, 26],
                [13, -45],
                [-1, -27],
                [3, -27],
                [7, -7],
                [10, -40],
                [-1, -12],
                [4, -22],
                [12, -25],
                [19, -110],
                [3, -29],
                [6, -29],
                [8, -65],
                [9, -55],
                [-3, -23],
                [9, -9],
                [-2, -33],
                [7, -14],
                [1, -38],
                [7, 2],
                [14, -40],
                [9, -7],
                [5, -19],
                [4, -5],
                [1, -19],
                [9, -5],
                [3, -23],
                [-4, -43],
                [1, -36],
                [4, -58],
                [-4, -15],
                [-6, -53],
                [-10, -39],
                [-3, 20],
                [-4, -6],
                [-3, 39],
                [1, 17],
                [-3, 20],
                [7, 21],
                [-2, 7],
                [-7, -26],
                [-3, 17],
                [-4, -10],
                [-12, 42],
                [4, 46],
                [-8, -15],
                [0, -23],
                [-6, 17],
                [-1, 22],
                [4, 24],
                [-1, 24],
                [-6, -19],
                [-6, 42],
                [-3, -8],
                [-2, 36],
                [5, 23],
                [6, 0],
                [-2, 28],
                [3, 36],
                [-5, -1],
                [-9, 32],
                [-6, 37],
                [-15, 27],
                [0, 77],
                [-4, 9],
                [1, 31],
                [-5, 9],
                [-8, 42],
                [-2, 22],
                [-12, 7],
                [-14, 56],
                [-6, 132],
                [-3, -30],
                [1, -27],
                [6, -53],
                [-1, -8],
                [3, -43],
                [0, -28],
                [-6, 6],
                [-4, 31],
                [-6, 6],
                [-8, -9],
                [0, 45],
                [-5, 38],
                [-5, -12],
                [-17, 40],
                [-2, -11],
                [10, -13],
                [7, -31],
                [3, -1],
                [1, -25],
                [4, -30],
                [-10, -16],
                [-5, 10],
                [0, -26],
                [-8, 20],
                [-2, 14],
                [-5, 0],
                [-13, 38],
                [-10, 33],
                [-1, 20],
                [-5, 30],
                [-14, 21],
                [-9, 21],
                [-14, 26],
                [-9, 24],
                [1, 26],
                [2, -9],
                [3, 17],
                [-3, 38],
                [4, 21],
                [-2, 9],
                [-7, -40],
                [-14, -26],
                [-18, 10],
                [-14, 24],
                [-1, 18],
                [-7, -4],
                [-7, 14],
                [-17, 12],
                [-9, 1],
                [-21, -10],
                [-8, -7],
                [-10, 27],
                [-12, 12],
                [-3, 17],
                [-2, 28],
                [-8, -2],
                [-3, -25],
                [-15, 34],
                [-2, 14],
                [-15, -27],
                [-7, -32],
                [-3, 30],
                [3, 17],
                [4, -5],
                [14, 22],
                [-2, 17],
                [-6, -8],
                [-3, 22],
                [-6, 3],
                [-6, 55],
                [-3, -13],
                [-8, -8],
                [-3, 8],
                [-3, -18],
                [-11, 6],
                [-1, -20],
                [-7, -5],
                [-3, 7],
                [2, 36],
                [-3, -1],
                [-5, -38],
                [7, -12],
                [1, -27],
                [4, -30],
                [-3, -31],
                [-5, 10],
                [-2, -15],
                [6, -7],
                [3, -41],
                [-8, -9],
                [-4, 9],
                [-7, -12],
                [-3, 10],
                [-9, -2],
                [0, 16],
                [-4, -10],
                [-3, -20],
                [-3, 18],
                [-5, -25],
                [2, -12],
                [-6, -15],
                [-6, -2],
                [-3, -20],
                [-6, -17],
                [-4, 6],
                [-5, -21],
                [-4, 1],
                [-8, -43],
                [-9, -3],
                [-3, 14],
                [-5, -23],
                [-11, 17],
                [2, 33],
                [8, 11],
                [4, -2],
                [2, 13],
                [8, 25],
                [0, 21],
                [-11, -28],
                [-9, 16],
                [-1, 12],
                [5, 48],
                [8, 34],
                [1, 29],
                [2, 5],
                [1, 30],
                [-4, 34],
                [10, 12],
                [19, 48],
                [4, -19],
                [6, -5],
                [9, 20],
                [-10, 26],
                [-4, 20],
                [-7, -2],
                [-5, 9],
                [-2, -8],
                [-9, -14],
                [-4, -26],
                [-9, -6],
                [-9, -30],
                [-1, -20],
                [-7, -11],
                [-2, -22],
                [-5, -13],
                [-2, -39],
                [-10, -25],
                [5, -20],
                [-4, -29],
                [-9, -5],
                [-1, -38],
                [-8, -13],
                [-3, 15],
                [-4, -29],
                [-5, -1],
                [1, -21],
                [-11, -13],
                [-2, -57],
                [12, -3],
                [10, -16],
                [3, -19],
                [-4, -30],
                [-7, -19],
                [-6, -1],
                [0, -17],
                [-4, -6],
                [1, -21],
                [-4, -31],
                [-9, -29],
                [-5, 0],
                [-5, -11],
                [-5, 2],
                [-4, -11],
                [2, -16],
                [-7, -8],
                [-2, -23],
                [-5, 14],
                [-5, -45],
                [-9, 4],
                [1, -24],
                [-6, 6],
                [-3, -11],
                [0, -32],
                [-6, -50],
                [-10, -6],
                [-7, -23],
                [-2, -13],
                [-5, 18],
                [-8, -48],
                [-2, 13],
                [-5, -4],
                [-1, -27],
                [-5, -10],
                [-6, 4],
                [-4, -27],
                [8, -9],
                [-9, -60],
                [-25, -20],
                [-6, -54],
                [-2, 12],
                [1, 33],
                [-5, 6],
                [-6, -13],
                [-1, -14],
                [-10, -22],
                [-4, -25],
                [-1, 18],
                [-2, -21],
                [-6, 14],
                [-10, -33],
                [-8, 2],
                [1, 25],
                [-4, 24],
                [-3, -20],
                [1, -21],
                [-11, -64],
                [-3, 16],
                [-1, -24],
                [-8, 4],
                [-1, 38],
                [-4, 8],
                [-2, -14],
                [4, -16],
                [-2, -27],
                [-5, -13],
                [-5, 29],
                [-5, 2],
                [-1, -11],
                [5, -17],
                [-9, -27],
                [6, -7],
                [0, -13],
                [-5, 9],
                [-7, -25],
                [-15, 1],
                [-7, -16],
                [0, -13],
                [-8, -15],
                [-6, 6],
                [-2, 35],
                [6, 12],
                [4, 43],
                [6, 1],
                [13, 28],
                [10, 1],
                [4, -27],
                [3, 20],
                [-1, 23],
                [6, 10],
                [7, 0],
                [8, 50],
                [10, 45],
                [12, 40],
                [15, 18],
                [6, -9],
                [6, 12],
                [1, -17],
                [-3, -19],
                [4, -14],
                [1, 23],
                [7, 2],
                [2, -15],
                [5, -5],
                [0, 18],
                [-8, 15],
                [0, 11],
                [5, 49],
                [6, 28],
                [9, 27],
                [15, 24],
                [10, 35],
                [5, -13],
                [4, 5],
                [-1, 22],
                [1, 21],
                [8, 44],
                [11, 28],
                [8, 38],
                [0, 21],
                [7, 148],
                [11, 40],
                [-1, 31],
                [-27, -45],
                [-8, 6],
                [-2, 18],
                [-5, 9],
                [-1, 21],
                [-4, -10],
                [-3, -32],
                [5, -41],
                [-6, -18],
                [-5, 7],
                [-9, 64],
                [-6, 33],
                [-4, 0],
                [-2, -24],
                [-3, -4],
                [-4, 19],
                [-5, 4],
                [-2, 32],
                [-16, -37],
                [-13, -26],
                [-1, -14],
                [-11, -22],
                [-6, 20],
                [5, 23],
                [-1, 54],
                [-4, 57],
                [7, 24],
                [-6, 49],
                [-5, 27],
                [-4, 39],
                [-6, 17],
                [-2, -34],
                [-7, -8],
                [-12, -22],
                [-14, -9],
                [-7, 2],
                [-7, 12],
                [-1, 30],
                [-5, 9],
                [-9, 42],
                [-8, 8],
                [-8, 46],
                [6, 21],
                [1, 39],
                [-5, -8],
                [0, 24],
                [2, 19],
                [-6, 18],
                [0, -19],
                [-7, 8],
                [-1, 32],
                [-6, 4],
                [-3, 22],
                [0, 27],
                [-5, -12],
                [-1, 26],
                [7, 6],
                [-6, 30],
                [10, 2],
                [0, 35],
                [2, 24],
                [18, 77],
                [4, 23],
                [3, -5],
                [-2, 33],
                [7, 55],
                [6, 22],
                [11, 9],
                [8, -9],
                [12, -33],
                [8, 4],
                [11, 32],
                [11, 49],
                [6, 6],
                [1, -13],
                [13, 0],
                [12, 10],
                [11, 52],
                [0, 12],
                [-5, 48],
                [-1, 28],
                [-8, 31],
                [-3, 26],
                [8, -7],
                [8, 22],
                [0, 20],
                [-10, 39],
                [-8, -30],
                [-7, 5],
                [-6, -17],
                [-8, -4],
                [-2, -11],
                [-9, -17],
                [-2, -28],
                [-5, -12],
                [-2, 34],
                [-5, 7],
                [-4, -26],
                [-2, 12],
                [-10, 19],
                [-20, -1],
                [-14, -21],
                [-6, -3],
                [-11, 13],
                [-22, 14],
                [-6, 12],
                [-3, 19],
                [2, 26],
                [-8, 22],
                [2, 24],
                [5, 12],
                [-2, 31],
                [-8, 0],
                [-6, 8],
                [-13, 6],
                [-7, 16],
                [-10, 16],
                [-1, 19],
                [16, 27],
                [20, 43],
                [15, 27],
                [8, -15],
                [8, -3],
                [2, 21],
                [-5, 3],
                [-1, 18],
                [20, 29],
                [22, 22],
                [12, 2],
                [7, -7],
                [-4, -32],
                [2, -22],
                [-3, -15],
                [4, -26],
                [8, 5],
                [10, -5],
                [11, 6],
                [4, -10],
                [7, -2],
                [7, 10],
                [8, -11],
                [9, 42],
                [5, 2],
                [5, -8],
                [2, 24],
                [-12, 11],
                [-11, -9],
                [1, 31],
                [-8, 34],
                [-10, 10],
                [-2, 30],
                [7, 8],
                [9, -31],
                [-1, -24],
                [4, -18],
                [10, -22],
                [2, 23],
                [-11, 30],
                [5, 54],
                [-4, 10],
                [-11, -12],
                [-11, 3],
                [-2, 10],
                [-6, -10],
                [-24, 23],
                [0, 24],
                [-7, 54],
                [-6, 19],
                [-9, 17],
                [-19, 46],
                [-9, 18],
                [-8, 4],
                [-13, 31],
                [-12, 18],
                [-1, 6],
                [9, 10],
                [4, 29],
                [1, 59],
                [25, -4],
                [31, 13],
                [8, 11],
                [12, 29],
                [12, 45],
                [3, 45],
                [5, 38],
                [10, 33],
                [5, 24],
                [13, 38],
                [2, -10],
                [11, -3],
                [16, 20],
                [10, 21],
                [24, 64],
                [9, 4],
                [1, -10],
                [9, 7],
                [9, -2],
                [18, 9],
                [17, 28],
                [17, 58],
                [7, 13],
                [2, -10],
                [26, -24],
                [2, -17],
                [-9, -22],
                [-4, -1],
                [0, -29],
                [14, 9],
                [0, 16],
                [6, 14],
                [2, -8],
                [5, 33],
                [13, -30],
                [-2, -23],
                [8, -6],
                [5, -14],
                [7, 22],
                [13, 1],
                [7, 7],
                [18, -7],
                [10, -8],
                [-5, -45],
                [17, -12],
                [2, -11],
                [16, -20],
                [1, 9],
                [12, 13],
                [11, -1],
                [0, -11],
                [7, -1],
                [7, 15],
                [11, 2],
                [9, -6],
                [11, -16],
                [5, 3],
                [7, -22],
                [4, 9],
                [7, -7],
                [5, -13]
            ],
            [
                [717, 7456],
                [-1, -8],
                [-9, 13],
                [7, 49],
                [6, 4],
                [4, 45],
                [5, -40],
                [4, 14],
                [8, -22],
                [0, -31],
                [-11, -4],
                [-5, -13],
                [-8, -7]
            ],
            [
                [688, 7363],
                [8, 25],
                [-8, 6],
                [0, 22],
                [6, 14],
                [5, -10],
                [0, -22],
                [3, 15],
                [0, 32],
                [5, -15],
                [1, 21],
                [5, -12],
                [5, 0],
                [5, 11],
                [7, -20],
                [0, -55],
                [9, 4],
                [-6, -37],
                [-11, 15],
                [4, -24],
                [-3, -20],
                [-6, 10],
                [0, -38],
                [-8, -10],
                [-3, -16],
                [-5, 15],
                [-6, -40],
                [-4, -4],
                [-5, -18],
                [-2, 43],
                [-6, -23],
                [-1, 13],
                [-6, 14],
                [0, 39],
                [-6, 15],
                [4, 45],
                [11, 28],
                [7, -2],
                [1, -21]
            ],
            [
                [671, 7185],
                [-6, -39],
                [-2, 6],
                [8, 33]
            ],
            [
                [640, 7055],
                [4, -2],
                [-1, -40],
                [-8, 6],
                [-1, 13],
                [6, 23]
            ],
            [
                [519, 6933],
                [-2, -41],
                [-9, -33],
                [5, 51],
                [2, -5],
                [4, 28]
            ],
            [
                [501, 6947],
                [5, 0],
                [0, -20],
                [-5, -23],
                [-5, 15],
                [-3, -14],
                [-2, 35],
                [2, 12],
                [8, -5]
            ],
            [
                [451, 6875],
                [1, -16],
                [-3, -11],
                [-3, 18],
                [5, 9]
            ],
            [
                [447, 8527],
                [-4, -19],
                [-2, 16],
                [6, 3]
            ],
            [
                [436, 6781],
                [6, -7],
                [-1, -16],
                [-5, 1],
                [0, 22]
            ],
            [
                [358, 6745],
                [2, -22],
                [-5, -10],
                [-1, 23],
                [4, 9]
            ],
            [
                [352, 6718],
                [-8, -21],
                [-2, 14],
                [3, 19],
                [7, -12]
            ],
            [
                [335, 7902],
                [6, 7],
                [2, -14],
                [5, 3],
                [6, -12],
                [1, -54],
                [-3, -18],
                [-7, -11],
                [-2, -18],
                [-11, 20],
                [-5, -1],
                [-10, 28],
                [-4, 0],
                [-6, 15],
                [-3, 25],
                [4, 7],
                [10, -7],
                [5, 20],
                [5, 2],
                [3, 14],
                [4, -6]
            ],
            [
                [334, 6690],
                [5, -14],
                [-10, -36],
                [1, -6],
                [12, 26],
                [0, -15],
                [-5, -17],
                [-8, -12],
                [-1, -18],
                [-8, -18],
                [-7, -1],
                [-5, -18],
                [-9, -16],
                [-5, 17],
                [9, 20],
                [3, -3],
                [8, 16],
                [-2, 19],
                [4, 20],
                [6, -9],
                [1, 12],
                [-7, 4],
                [-4, 14],
                [4, 23],
                [11, 13],
                [2, -26],
                [5, 25]
            ],
            [
                [266, 6527],
                [10, 37],
                [1, 16],
                [4, 17],
                [7, 9],
                [3, -10],
                [1, -25],
                [-12, -27],
                [-6, -40],
                [-6, -13],
                [-2, 36]
            ],
            [
                [238, 6477],
                [2, -19],
                [-8, -1],
                [-1, 13],
                [7, 7]
            ],
            [
                [227, 7303],
                [-4, -18],
                [-1, 18],
                [5, 0]
            ],
            [
                [212, 6440],
                [2, -18],
                [-5, -13],
                [-1, 19],
                [4, 12]
            ],
            [
                [182, 8542],
                [22, -28],
                [13, 24],
                [6, -2],
                [5, -14],
                [2, -23],
                [11, -12],
                [4, -12],
                [15, -5],
                [8, -8],
                [-4, -28],
                [-7, 6],
                [-8, -5],
                [-4, -13],
                [-4, -28],
                [-5, 26],
                [-6, 18],
                [-6, 2],
                [-3, 20],
                [-15, 25],
                [-6, 1],
                [-11, -22],
                [-7, 11],
                [-4, 23],
                [4, 44]
            ],
            [
                [162, 6381],
                [0, -22],
                [-5, -4],
                [1, 19],
                [4, 7]
            ],
            [
                [128, 6335],
                [4, -8],
                [10, 1],
                [1, -7],
                [-13, -9],
                [-2, 23]
            ],
            [
                [108, 6360],
                [0, 19],
                [4, 7],
                [6, -19],
                [-2, -17],
                [-4, 1],
                [1, -20],
                [-5, -2],
                [-12, -21],
                [-6, 6],
                [2, 15],
                [7, -2],
                [9, 33]
            ],
            [
                [47, 6279],
                [5, 3],
                [0, -24],
                [-6, 3],
                [-8, -28],
                [-4, 37],
                [4, 1],
                [0, 29],
                [5, 1],
                [0, -21],
                [4, -1]
            ],
            [
                [28, 6296],
                [3, -9],
                [-2, -32],
                [-5, -10],
                [0, 20],
                [4, 31]
            ],
            [
                [0, 6291],
                [5, -1],
                [4, -23],
                [-4, -27],
                [-5, 51]
            ],
            [
                [9993, 6496],
                [6, -13],
                [0, -19],
                [-11, -12],
                [-8, 31],
                [0, 15],
                [13, -2]
            ],
            [
                [1966, 3444],
                [-1, -1081]
            ],
            [
                [1965, 2363],
                [-57, 0],
                [-34, 71],
                [-73, 150],
                [3, 43]
            ],
            [
                [1804, 2627],
                [6, 8],
                [1, 16],
                [-1, 36],
                [-4, 1],
                [-2, 71],
                [6, 27],
                [0, 28],
                [-1, 45],
                [4, 34],
                [4, 12],
                [4, 25],
                [-6, 27],
                [-4, 51],
                [-5, 31],
                [0, 24]
            ],
            [
                [1806, 3063],
                [2, 26],
                [0, 36],
                [-3, 36],
                [-2, 112],
                [11, 7],
                [3, -23],
                [3, 1],
                [3, 33],
                [0, 153]
            ],
            [
                [1823, 3444],
                [101, 2],
                [42, -2]
            ],
            [
                [2515, 3253],
                [-1, -35],
                [-4, -11],
                [-1, -29],
                [-5, -31],
                [0, -46],
                [-3, -34],
                [-3, -5]
            ],
            [
                [2498, 3062],
                [2, -17],
                [-4, -14],
                [-2, -33],
                [-3, -8],
                [0, -38],
                [-5, -10],
                [0, -13],
                [-6, -31],
                [2, -21],
                [-5, -30],
                [-5, -59],
                [5, -25],
                [-2, -16],
                [1, -39],
                [-2, -26]
            ],
            [
                [2474, 2682],
                [-69, 3],
                [-13, 0]
            ],
            [
                [2392, 2685],
                [0, 101],
                [-4, 8],
                [-5, -9],
                [-3, 18]
            ],
            [
                [2380, 2803],
                [1, 335],
                [-5, 211]
            ],
            [
                [2376, 3349],
                [4, 0],
                [123, -1],
                [2, -36],
                [-4, -23],
                [-4, -36],
                [18, 0]
            ],
            [
                [1654, 4398],
                [0, -331],
                [0, -241],
                [36, -171],
                [35, -169],
                [27, -137],
                [20, -101],
                [34, -185]
            ],
            [
                [1804, 2627],
                [-38, -18],
                [-30, -16],
                [-4, 25],
                [0, 40],
                [-2, 47],
                [-4, 33],
                [-9, 46],
                [-12, 43],
                [-2, -12],
                [-4, 8],
                [1, 18],
                [-5, 39],
                [-7, -8],
                [-12, 28],
                [-2, 23],
                [-8, 28],
                [-9, -1],
                [-7, 13],
                [-10, -6],
                [-5, 26],
                [1, 53],
                [-1, 8],
                [1, 38],
                [-8, 28],
                [0, 39],
                [-3, 2],
                [-4, 33],
                [-4, 8],
                [-1, 20],
                [-11, 79],
                [-5, 23],
                [-1, 61],
                [2, -5],
                [2, 37],
                [-4, 33],
                [-5, -4],
                [-7, 30],
                [-2, 24],
                [0, 23],
                [-3, 31],
                [0, 50],
                [5, 0],
                [-2, 70],
                [-2, -7],
                [-1, -35],
                [-5, -7],
                [-7, 26],
                [-1, 45],
                [-4, 35],
                [-6, 22],
                [-3, 25],
                [-9, 50],
                [2, 14],
                [-4, 64],
                [2, 35],
                [-3, 54],
                [-7, 52],
                [-7, 29],
                [-2, 35],
                [7, 83],
                [2, 29],
                [-2, 22],
                [3, 57],
                [-2, 52],
                [-3, 13],
                [1, 42]
            ],
            [
                [1534, 4399],
                [28, 1],
                [24, 1],
                [38, -3],
                [30, 0]
            ],
            [
                [2107, 4208],
                [57, 0],
                [0, -191]
            ],
            [
                [2164, 4017],
                [1, -574]
            ],
            [
                [2165, 3443],
                [-28, 1]
            ],
            [
                [2137, 3444],
                [-38, -1],
                [-72, 0],
                [-15, 1],
                [-46, 0]
            ],
            [
                [1966, 3444],
                [0, 223],
                [-1, 21],
                [0, 162],
                [0, 357]
            ],
            [
                [1965, 4207],
                [32, 1],
                [63, -1],
                [47, 1]
            ],
            [
                [3025, 4400],
                [0, -113],
                [-2, -18]
            ],
            [
                [3023, 4269],
                [-2, 3],
                [-12, -14],
                [-15, 4],
                [-7, -26],
                [-7, -9],
                [-8, -22]
            ],
            [
                [2972, 4205],
                [-2, 22],
                [7, 21],
                [-2, 16],
                [2, 144]
            ],
            [
                [2977, 4408],
                [12, -2],
                [36, -3],
                [0, -3]
            ],
            [
                [2922, 3980],
                [-2, -23]
            ],
            [
                [2920, 3957],
                [-3, -13],
                [0, -30],
                [5, -29],
                [1, -47],
                [6, -49],
                [3, -2],
                [1, -66]
            ],
            [
                [2933, 3721],
                [-19, 2],
                [-2, 241]
            ],
            [
                [2912, 3964],
                [5, 21],
                [5, -5]
            ],
            [
                [2876, 3786],
                [-2, 27]
            ],
            [
                [2874, 3813],
                [2, 12],
                [4, -19],
                [-4, -20]
            ],
            [
                [2649, 2300],
                [4, -55],
                [39, -13],
                [37, -14],
                [1, -41],
                [4, 1],
                [1, 39],
                [-1, 35],
                [2, 15],
                [7, -16],
                [8, -7]
            ],
            [
                [2751, 2244],
                [1, -83],
                [4, -93],
                [8, -122],
                [13, -131],
                [-2, -9],
                [1, -61],
                [5, -68],
                [8, -137],
                [2, -42],
                [0, -44],
                [-3, -158],
                [-3, -3],
                [-3, -49],
                [1, -16],
                [-5, -36],
                [-2, 9],
                [-6, -15],
                [-9, -8],
                [-2, 20],
                [1, 29],
                [-7, 85],
                [-5, 15],
                [-4, -11],
                [-3, 47],
                [-1, 38],
                [-6, 43],
                [-2, 28],
                [1, 41],
                [-3, 8],
                [1, -24],
                [-3, -7],
                [-9, 104],
                [-4, 26],
                [9, 76],
                [-6, -4],
                [-4, -24],
                [-3, 38],
                [5, 104],
                [1, 87],
                [-4, 21],
                [-1, 28],
                [-5, 6],
                [-7, 46],
                [-5, 19],
                [0, 28],
                [-4, 11],
                [-3, 31],
                [-11, 42],
                [-9, -10],
                [0, -29],
                [-3, 5],
                [-12, -35],
                [-12, -9],
                [0, 21],
                [-3, 25],
                [-15, 57],
                [-10, 24],
                [-10, 6],
                [-8, -4],
                [-17, -18]
            ],
            [
                [2703, 3063],
                [-6, -41],
                [0, -20],
                [9, -40],
                [3, 3],
                [5, -42],
                [1, -22],
                [4, -40],
                [7, -24],
                [3, -35],
                [8, -33],
                [0, -22],
                [5, -35],
                [7, -29],
                [2, -32],
                [1, -40],
                [3, -14],
                [5, -51],
                [0, -33],
                [7, -16]
            ],
            [
                [2767, 2497],
                [-7, -65],
                [-2, -34],
                [-3, -29],
                [0, -30],
                [-3, -14],
                [-1, -81]
            ],
            [
                [2632, 3060],
                [37, 1]
            ],
            [
                [2669, 3061],
                [20, -1],
                [14, 3]
            ],
            [
                [640, 0],
                [-7, 17],
                [-1, 16],
                [1, 43],
                [-5, 73],
                [4, 24],
                [2, 34],
                [-2, 22],
                [1, 23],
                [8, -27],
                [9, -20],
                [5, -29],
                [0, -26],
                [8, -40],
                [-5, -34],
                [-8, -15],
                [-7, -25],
                [-3, -36]
            ],
            [
                [613, 397],
                [3, -26],
                [4, 11],
                [9, -30],
                [-1, -27],
                [-9, -14],
                [-2, 6],
                [-1, 33],
                [-5, 7],
                [-1, 19],
                [3, 21]
            ],
            [
                [602, 432],
                [-3, -20],
                [-7, 0],
                [2, 22],
                [8, -2]
            ],
            [
                [574, 525],
                [3, -45],
                [-2, -26],
                [-6, -5],
                [-4, 54],
                [4, 1],
                [5, 21]
            ],
            [
                [531, 626],
                [3, -2],
                [2, -20],
                [-1, -28],
                [-4, -18],
                [-9, 22],
                [1, 31],
                [8, 15]
            ],
            [
                [1908, 4871],
                [0, -472]
            ],
            [
                [1908, 4399],
                [-31, -1],
                [-54, 0]
            ],
            [
                [1823, 4398],
                [-85, 1]
            ],
            [
                [1738, 4399],
                [0, 349],
                [4, 62],
                [-2, 16],
                [-6, 3],
                [-2, 26],
                [6, 68],
                [3, 6],
                [3, 29],
                [-1, 17],
                [4, 23],
                [1, 34],
                [6, 56],
                [-2, 26],
                [-7, 14],
                [-4, 32]
            ],
            [
                [1741, 5160],
                [0, 34],
                [-3, 33],
                [0, 16],
                [0, 255],
                [0, 236]
            ],
            [
                [1738, 5734],
                [28, 0]
            ],
            [
                [1766, 5734],
                [0, -195],
                [9, -54],
                [1, -52],
                [5, -23],
                [6, -8],
                [0, -14],
                [11, -51],
                [1, -21],
                [8, -20],
                [0, -12],
                [8, 1],
                [-4, -71],
                [-1, -45],
                [3, -29],
                [-5, -21],
                [2, -20],
                [-1, -21],
                [6, -20],
                [7, 26],
                [3, 21],
                [5, -19],
                [-1, -15],
                [3, -37],
                [5, -39],
                [3, -13],
                [0, -37],
                [3, -16],
                [6, -2],
                [4, -61],
                [3, -11],
                [3, 18],
                [9, -1],
                [7, 17],
                [3, -10],
                [7, 9],
                [2, -11],
                [5, 8],
                [7, 39],
                [4, -33],
                [5, -20]
            ],
            [
                [2489, 4496],
                [53, -3],
                [28, 0]
            ],
            [
                [2570, 4493],
                [-1, -37],
                [4, -43],
                [5, -70]
            ],
            [
                [2578, 4343],
                [0, -450],
                [-3, -35],
                [3, -40],
                [1, -34],
                [-4, -27],
                [-1, -25],
                [-5, -41],
                [-3, -3],
                [0, -24],
                [-2, -9],
                [-1, -45],
                [0, -13]
            ],
            [
                [2563, 3597],
                [-3, -27],
                [2, -34],
                [-11, -17],
                [-1, -20],
                [2, -25],
                [-3, -16],
                [-11, 29],
                [-3, -2],
                [-4, -33],
                [1, -11]
            ],
            [
                [2532, 3441],
                [-5, 2],
                [-6, 55],
                [2, 12],
                [-2, 37],
                [0, 29],
                [-9, 41],
                [-3, -4],
                [-3, 25],
                [-9, 38],
                [0, 31],
                [5, 49],
                [-1, 18],
                [3, 23],
                [-4, 13],
                [-6, 9],
                [-3, -18],
                [-3, 11],
                [-1, 63],
                [-10, 41],
                [-9, 49],
                [-3, 58],
                [-1, 39],
                [3, 27]
            ],
            [
                [2467, 4089],
                [0, 35],
                [8, 21],
                [1, 29],
                [4, 19],
                [0, 33],
                [-4, 27],
                [2, 34],
                [11, 9],
                [9, 24],
                [0, 29],
                [4, 13],
                [1, 37],
                [0, 24],
                [-7, 18],
                [-1, 20],
                [-6, 35]
            ],
            [
                [2655, 4340],
                [0, -228],
                [0, -266]
            ],
            [
                [2655, 3846],
                [-2, -9],
                [2, -52],
                [-5, -1],
                [-5, -18],
                [-8, 9],
                [1, -38],
                [-5, -16],
                [-2, -24],
                [-5, -9],
                [-3, -48],
                [-3, -13],
                [-6, 18],
                [-1, 22],
                [-7, -24],
                [1, -21],
                [-7, -7],
                [-1, 19],
                [-8, -19],
                [-2, -20],
                [-7, 28],
                [-4, -6],
                [-2, 13],
                [-3, -13],
                [-7, -2],
                [-3, -18]
            ],
            [
                [2578, 4343],
                [3, -12],
                [8, 0],
                [9, 22]
            ],
            [
                [2598, 4353],
                [23, 0],
                [34, 0],
                [0, -13]
            ],
            [
                [2473, 4685],
                [0, -28],
                [4, -19],
                [-3, -23],
                [1, -43],
                [2, -30],
                [10, -22],
                [2, -24]
            ],
            [
                [2467, 4089],
                [-3, 7],
                [-6, 38],
                [-3, -1],
                [-40, -5],
                [-39, -2],
                [-33, 3]
            ],
            [
                [2343, 4129],
                [-3, 25],
                [2, 49],
                [-3, 43],
                [0, 48],
                [-5, 17],
                [-1, 26],
                [2, 23],
                [-2, 33],
                [-4, 13],
                [-5, 86]
            ],
            [
                [2324, 4492],
                [-5, 41],
                [2, 29],
                [1, 37],
                [2, 14],
                [-3, 19],
                [1, 33],
                [-2, 16],
                [4, 4]
            ],
            [
                [2324, 4685],
                [144, 0],
                [5, 0]
            ],
            [
                [2356, 4017],
                [3, -18],
                [9, -14],
                [-6, -56],
                [4, -18],
                [4, -45],
                [6, -10],
                [0, -412]
            ],
            [
                [2376, 3444],
                [-156, 0],
                [-55, -1]
            ],
            [
                [2164, 4017],
                [5, 0],
                [187, 0]
            ],
            [
                [2718, 3716],
                [-1, -57],
                [4, -37],
                [4, -28],
                [2, -22],
                [5, -22],
                [4, -3]
            ],
            [
                [2736, 3547],
                [-11, -51],
                [-11, -29],
                [0, -14],
                [-4, -13],
                [0, -16],
                [-6, -8],
                [-1, -21],
                [-16, -27]
            ],
            [
                [2687, 3368],
                [0, -3],
                [-24, 2],
                [-22, 6],
                [-5, -2],
                [-32, 8],
                [-36, -5],
                [-6, 9],
                [1, -35],
                [-36, 2],
                [-3, -2]
            ],
            [
                [2524, 3348],
                [1, 24],
                [5, -8],
                [2, 77]
            ],
            [
                [2655, 3846],
                [11, 0],
                [5, -40],
                [1, -17],
                [9, -7],
                [6, -26],
                [5, 13],
                [10, -14],
                [4, 19],
                [4, 6],
                [1, -32],
                [3, -6],
                [4, -26]
            ],
            [
                [2474, 2682],
                [3, -22],
                [-2, -9],
                [-1, -38],
                [5, -24],
                [0, -57],
                [-3, -44],
                [-7, -27],
                [-2, -43],
                [-2, 4],
                [-1, -70],
                [-3, -2],
                [2, -37],
                [-2, -14],
                [54, 0],
                [-3, -63],
                [4, -41],
                [1, -32],
                [4, -20]
            ],
            [
                [2521, 2143],
                [-9, -26],
                [0, -19],
                [7, -12],
                [3, 30],
                [6, -30],
                [-1, -24],
                [-3, -11],
                [-7, 10],
                [1, -18],
                [-2, -27],
                [5, -24],
                [9, -7],
                [3, -29],
                [3, -4],
                [-5, -32],
                [-5, 6],
                [-4, 33],
                [-10, 18],
                [0, 33],
                [-6, -11],
                [1, -27],
                [-3, -25],
                [-3, -4],
                [-3, 28],
                [-7, 1],
                [-2, -29],
                [-4, -9],
                [-5, 18],
                [-4, 2],
                [-3, 47],
                [-7, 21],
                [-2, -3],
                [-3, 40],
                [-7, -5],
                [0, 24],
                [-8, -23],
                [1, -18],
                [-5, -17],
                [-9, 8],
                [-10, 27],
                [-7, 11],
                [-16, -9],
                [-2, -8]
            ],
            [
                [2398, 2049],
                [-2, 19],
                [6, 68],
                [-2, 37],
                [2, 20],
                [-1, 26],
                [3, 19],
                [3, 50],
                [0, 40],
                [-8, 78],
                [0, 41],
                [-7, 42],
                [0, 196]
            ],
            [
                [3046, 5029],
                [12, 26],
                [-2, 13],
                [5, 30],
                [4, 13],
                [-1, 12],
                [5, 18],
                [-1, 33],
                [2, 50],
                [5, 17],
                [1, 53],
                [22, 147],
                [6, -7],
                [0, -35],
                [4, -13],
                [9, 21],
                [6, 0],
                [4, 14],
                [8, -31],
                [4, -25],
                [1, -214],
                [-1, -51],
                [10, -14],
                [-2, -22],
                [3, -21],
                [-2, -18],
                [4, -30],
                [5, 7],
                [5, -68],
                [-6, -31],
                [-3, 12],
                [-3, -21],
                [-4, 5],
                [0, -18],
                [-6, 2],
                [-8, -40],
                [-2, 28],
                [-3, 2],
                [1, -30],
                [-6, -15],
                [-2, 24],
                [-3, -12],
                [-7, 0],
                [0, 28],
                [-5, -6],
                [1, -20],
                [-4, -42],
                [1, -12],
                [-6, -23],
                [-5, 9],
                [-3, -24],
                [-4, -3],
                [-4, -20],
                [-4, 4],
                [-1, 21],
                [-7, -34],
                [2, -21],
                [-5, -7],
                [0, -18],
                [-5, -22],
                [-5, -50]
            ],
            [
                [3056, 4600],
                [-3, 14],
                [0, 19],
                [-4, 22],
                [-2, 250],
                [-1, 124]
            ],
            [
                [2904, 3626],
                [2, 0],
                [-1, 0],
                [-1, 0]
            ],
            [
                [2933, 3721],
                [-6, -80]
            ],
            [
                [2927, 3641],
                [-4, -3],
                [-8, -12]
            ],
            [
                [2915, 3626],
                [-6, -8],
                [0, 31],
                [-2, 13],
                [3, 13],
                [-4, 32],
                [-2, -14],
                [-6, 3],
                [-2, 35],
                [2, 0],
                [0, 45],
                [2, 18],
                [-2, 60],
                [3, 36],
                [5, 6],
                [0, 37],
                [-3, -5],
                [0, -18],
                [-8, -25],
                [-2, -21],
                [0, -56],
                [-3, -26],
                [1, -44],
                [4, -30],
                [-1, -23],
                [3, -23],
                [-2, -16],
                [-6, 30],
                [-10, 15],
                [-2, 29],
                [-6, -16],
                [-2, 23],
                [5, 29]
            ],
            [
                [2874, 3756],
                [2, 30]
            ],
            [
                [2874, 3813],
                [-4, 18],
                [-6, 10],
                [0, 28],
                [-3, 15],
                [-4, 4]
            ],
            [
                [2857, 3888],
                [-4, 53],
                [-4, 0],
                [-5, 18],
                [-3, -15],
                [-5, 1],
                [-1, -21],
                [-8, 14],
                [-6, -28],
                [-3, 6],
                [-6, -33],
                [-6, -17],
                [1, 98]
            ],
            [
                [2807, 3964],
                [105, 0]
            ],
            [
                [3053, 4565],
                [1, -34],
                [-1, -27],
                [-5, -25],
                [0, -29],
                [6, -4],
                [4, -31],
                [0, -24],
                [3, -6],
                [0, -22],
                [8, -19],
                [9, 18],
                [-2, -26],
                [-13, -23],
                [-5, -1],
                [-3, 18],
                [-5, -6],
                [0, -13],
                [-5, -9]
            ],
            [
                [3045, 4302],
                [-3, 35]
            ],
            [
                [3042, 4337],
                [0, 6]
            ],
            [
                [3042, 4343],
                [-3, 14],
                [-2, 45],
                [-4, 0],
                [-8, -2]
            ],
            [
                [2977, 4408],
                [0, 7],
                [6, 126]
            ],
            [
                [2983, 4541],
                [23, -3]
            ],
            [
                [3006, 4538],
                [34, -7],
                [3, 18],
                [7, 19],
                [3, -3]
            ],
            [
                [2598, 4353],
                [5, 25],
                [4, 43],
                [4, 26],
                [3, 36],
                [1, 52],
                [0, 57],
                [-9, 111],
                [3, 42],
                [-2, 50],
                [6, 51],
                [2, 43],
                [-1, 23],
                [5, 9],
                [0, 31],
                [8, 9],
                [5, 34],
                [0, -69],
                [3, -3],
                [3, 35],
                [1, 58],
                [2, 15],
                [8, 9],
                [-3, 41],
                [5, 35],
                [7, 2],
                [7, -22],
                [7, -3],
                [3, -28],
                [6, -2],
                [9, -25],
                [3, 1],
                [4, -41],
                [-3, -21],
                [3, -29],
                [2, -32],
                [-2, -71],
                [-6, -18],
                [-1, -37],
                [-7, -12],
                [-4, -44],
                [2, -17],
                [6, -15],
                [6, 24],
                [6, 49],
                [10, 19],
                [5, -15],
                [3, -27],
                [3, -80],
                [0, -39],
                [3, -48],
                [-3, -69],
                [-4, -11],
                [-1, 25],
                [-3, -7],
                [-3, -58],
                [-6, -21],
                [-2, -44],
                [-7, -37],
                [0, -16]
            ],
            [
                [2694, 4347],
                [-39, -7]
            ],
            [
                [2635, 5110],
                [1, -23],
                [-4, -4],
                [1, 33],
                [2, -6]
            ],
            [
                [2496, 5270],
                [11, 20],
                [5, 23],
                [12, 9],
                [8, 29],
                [4, 1],
                [3, 20],
                [9, 28],
                [4, 24],
                [7, 15],
                [6, -13],
                [-11, -59],
                [-2, -19],
                [0, -36],
                [5, 27],
                [10, -4],
                [8, -19],
                [7, -52],
                [3, -10],
                [7, 9],
                [2, -12],
                [7, -6],
                [16, 44],
                [8, 4],
                [10, -2],
                [7, 15],
                [6, 1],
                [1, -54],
                [5, -7],
                [6, 8],
                [2, -12],
                [4, 16],
                [8, 5],
                [1, -67],
                [3, -28],
                [6, -8],
                [1, 19],
                [5, 0],
                [3, -20],
                [-3, -14],
                [-15, 12],
                [-8, -8],
                [-8, 23],
                [-2, -21],
                [1, -18],
                [-4, 4],
                [-5, 27],
                [-9, 15],
                [-5, 1],
                [-4, -25],
                [-8, -6],
                [-8, 5],
                [-3, -10],
                [-1, -21],
                [-9, -18],
                [1, 25],
                [-4, 5],
                [-2, -26],
                [-6, -1],
                [-3, -11],
                [-5, -45],
                [-8, -58],
                [1, -5]
            ],
            [
                [2576, 4989],
                [-4, 20],
                [2, 27],
                [-7, 4],
                [3, 26],
                [0, 34],
                [-5, 23],
                [-4, 24],
                [-12, 19],
                [-4, -7],
                [-12, 29],
                [-29, 38],
                [-3, 33],
                [-5, 11]
            ],
            [
                [2541, 5539],
                [-7, -24],
                [-4, -3],
                [1, 19],
                [18, 45],
                [-4, -31],
                [-4, -6]
            ],
            [
                [2324, 4685],
                [0, 343],
                [-7, 22],
                [-5, 36],
                [8, 41],
                [1, 22]
            ],
            [
                [2321, 5149],
                [-1, 76],
                [-4, 20],
                [-2, 42],
                [0, 51],
                [-1, 8],
                [-1, 123],
                [-5, 65],
                [-3, 36],
                [0, 77],
                [1, 27],
                [-3, 60]
            ],
            [
                [2302, 5734],
                [59, 0],
                [0, 73],
                [5, -2],
                [4, -14],
                [4, -100],
                [3, -11],
                [9, -3],
                [1, -10],
                [11, -4],
                [1, -21],
                [10, 5],
                [0, 9],
                [7, 10],
                [6, -4],
                [8, -16],
                [2, -19],
                [4, 2],
                [4, -43],
                [2, 18],
                [7, 8],
                [1, -18],
                [9, -12],
                [0, -17],
                [4, -14],
                [8, 8],
                [5, 18],
                [8, 12],
                [2, -28],
                [5, 6],
                [6, -6],
                [6, 4],
                [8, -24],
                [7, 4],
                [0, -10],
                [-10, -24],
                [-13, -19],
                [-9, -20],
                [-12, -49],
                [-5, -31],
                [-8, -34],
                [-13, -46],
                [2, -16]
            ],
            [
                [2450, 5296],
                [-2, 9],
                [-6, -16],
                [0, -113],
                [-2, -11],
                [-8, -16],
                [-6, -41],
                [-1, -27],
                [3, -2],
                [4, -24],
                [-3, -29],
                [0, -33],
                [-2, -70],
                [8, -34],
                [6, -3],
                [3, -21],
                [8, -21],
                [2, -25],
                [8, -33],
                [5, -7],
                [5, -42],
                [-1, -30],
                [2, -22]
            ],
            [
                [2553, 2179],
                [-3, -8],
                [-7, 4],
                [-3, 12],
                [-7, -8],
                [-9, -22],
                [-3, -14]
            ],
            [
                [2498, 3062],
                [53, 0],
                [7, 0]
            ],
            [
                [2524, 3348],
                [-2, 0],
                [-2, 0],
                [1, -47],
                [-6, -48]
            ],
            [
                [2376, 3349],
                [0, 95]
            ],
            [
                [2356, 4017],
                [-7, 50],
                [-6, 62]
            ],
            [
                [2108, 5151],
                [0, -181],
                [-1, 0]
            ],
            [
                [2107, 4970],
                [-53, 1],
                [-90, 0],
                [-56, 0],
                [0, -100]
            ],
            [
                [1766, 5734],
                [130, -1],
                [58, 1],
                [154, 0]
            ],
            [
                [2108, 5734],
                [0, -217],
                [0, -366]
            ],
            [
                [2107, 4208],
                [0, 382]
            ],
            [
                [2107, 4590],
                [21, 0],
                [49, -1],
                [88, 0],
                [1, -10],
                [15, -34],
                [4, 19],
                [4, -4],
                [13, 0],
                [15, -36],
                [2, -27],
                [5, -5]
            ],
            [
                [1823, 4398],
                [0, -954]
            ],
            [
                [1654, 4398],
                [37, -1],
                [47, 2]
            ],
            [
                [3006, 4538],
                [-2, 14],
                [0, 28],
                [3, 11],
                [-1, 27],
                [3, 81],
                [5, 37],
                [2, 43],
                [3, 16],
                [-1, 47],
                [10, 17],
                [5, 33],
                [-3, 31],
                [4, 32],
                [0, 18]
            ],
            [
                [3034, 4973],
                [4, 49],
                [6, -5],
                [2, 12]
            ],
            [
                [3056, 4600],
                [-3, -35]
            ],
            [
                [2962, 4152],
                [-5, -13],
                [-2, -29],
                [8, -14],
                [0, -22],
                [-3, -103],
                [-9, -76],
                [-6, -22],
                [-5, -48],
                [-3, 31],
                [-8, 16],
                [-10, 42],
                [-1, 28],
                [0, 4],
                [2, 11]
            ],
            [
                [2922, 3980],
                [8, 15],
                [0, 15],
                [9, 31],
                [2, 17],
                [-9, 39],
                [0, 24],
                [-3, 6],
                [-1, 22],
                [5, 33],
                [-3, 20],
                [7, 40],
                [2, 21],
                [4, 13]
            ],
            [
                [2943, 4276],
                [13, -41],
                [9, -28],
                [-3, -55]
            ],
            [
                [2137, 3444],
                [0, -95]
            ],
            [
                [2137, 3349],
                [-1, 0],
                [0, -474],
                [0, -193],
                [0, -192],
                [-101, 0],
                [-1, -18],
                [3, -22]
            ],
            [
                [2037, 2450],
                [-48, 0],
                [0, -87],
                [-24, 0]
            ],
            [
                [2972, 4205],
                [13, -15],
                [2, 11],
                [10, 0],
                [6, 6],
                [8, 31],
                [1, -22],
                [5, -10],
                [-11, -28],
                [-22, -42],
                [-9, -8],
                [-6, 2],
                [-5, -9],
                [-2, 31]
            ],
            [
                [2943, 4276],
                [-2, 14],
                [-4, 1],
                [-5, 32],
                [1, 29],
                [-4, 22],
                [-2, -2],
                [-3, 27],
                [-125, 0],
                [0, 48],
                [0, 3]
            ],
            [
                [2799, 4450],
                [17, 54],
                [3, 26],
                [5, 18],
                [-2, 32],
                [-2, 7],
                [-2, 52],
                [17, 22],
                [15, -1],
                [6, -5],
                [6, -21],
                [4, 8],
                [12, -1],
                [8, 14],
                [8, 34],
                [5, 1],
                [0, 52],
                [3, 31],
                [-7, 21],
                [2, 24],
                [11, 32],
                [4, 28],
                [14, 64],
                [13, 32],
                [19, -5],
                [23, 4]
            ],
            [
                [2981, 4973],
                [1, -39],
                [-2, -36],
                [3, -34],
                [-1, -37],
                [-3, -39],
                [2, -52],
                [-1, -16],
                [4, -31],
                [-1, -132],
                [0, -16]
            ],
            [
                [2909, 3359],
                [4, -77],
                [-8, 8],
                [-1, -10],
                [-10, -11],
                [-1, -11],
                [-7, -3],
                [0, -13],
                [8, 9],
                [1, -8],
                [9, 9],
                [3, -18],
                [5, 8],
                [2, -46],
                [-2, -22],
                [-3, -2],
                [-8, -47],
                [-9, -2],
                [-2, -33],
                [4, -32],
                [4, -6],
                [-6, -54],
                [-6, 7],
                [-9, -6],
                [-6, -11],
                [-10, -37],
                [-7, -48],
                [-4, -60],
                [-6, 13],
                [-11, -12]
            ],
            [
                [2833, 2844],
                [-32, 181],
                [-32, 4],
                [1, 21],
                [-5, 33],
                [-3, -12],
                [0, 20],
                [-35, 10],
                [-8, -8],
                [-6, -17],
                [-10, -13]
            ],
            [
                [2669, 3061],
                [1, 45],
                [5, 4],
                [3, 31],
                [7, 29],
                [7, 1],
                [7, 29],
                [8, 10],
                [6, 43],
                [4, 13],
                [1, -19],
                [11, 37],
                [5, -8],
                [4, 36],
                [5, 9],
                [1, 45]
            ],
            [
                [2744, 3366],
                [20, -5],
                [19, -3],
                [23, -1],
                [103, 2]
            ],
            [
                [2321, 5149],
                [-213, 2]
            ],
            [
                [2108, 5734],
                [194, 0]
            ],
            [
                [2777, 4138],
                [-4, -10],
                [2, -21],
                [0, -29],
                [-4, -46],
                [-3, -70],
                [-11, -62],
                [-3, -8],
                [-4, 12],
                [-3, -27],
                [-3, 1],
                [-4, -36],
                [1, -22],
                [-3, -18],
                [-4, 29],
                [-5, -46],
                [1, -29],
                [-3, -11],
                [-1, -25],
                [-8, -4]
            ],
            [
                [2694, 4347],
                [11, -26],
                [3, -15],
                [3, 14],
                [6, -30],
                [4, -9],
                [14, 25],
                [7, -6],
                [9, 36],
                [12, 34],
                [14, 24]
            ],
            [
                [2777, 4394],
                [0, -256]
            ],
            [
                [2380, 2803],
                [-11, 21],
                [-3, 22],
                [-7, 18],
                [-2, -16],
                [-8, 1],
                [-1, 10],
                [-7, -19],
                [-3, 11],
                [-6, -10],
                [-5, -29],
                [-2, 17],
                [-6, 14],
                [-7, 0],
                [-2, 21],
                [-7, -42],
                [-2, 24],
                [-3, -8],
                [-3, 16],
                [-7, 15],
                [-5, -25],
                [-2, 26],
                [-4, 3],
                [-2, 21],
                [-6, 8],
                [-3, -18],
                [-3, 16],
                [-5, -2],
                [-6, 17],
                [-6, -2],
                [-2, 36],
                [-9, 2],
                [-4, -6],
                [-6, 37],
                [-2, -3],
                [0, 370],
                [-52, 0],
                [-34, 0]
            ],
            [
                [1534, 4399],
                [-4, 22],
                [-2, 61],
                [0, 43],
                [-4, 33],
                [3, 32],
                [2, 51],
                [4, 54],
                [2, 48],
                [3, 162],
                [0, 22],
                [3, 71],
                [1, 99],
                [-2, 54],
                [1, 32],
                [12, 29]
            ],
            [
                [1553, 5212],
                [5, -22],
                [4, 5],
                [3, 2],
                [6, -20],
                [3, -23],
                [1, -57],
                [15, -21],
                [12, 30],
                [8, 3],
                [9, -10],
                [1, -13],
                [16, 27],
                [3, -9],
                [9, 5],
                [7, 19],
                [12, 17],
                [12, 4],
                [4, 12],
                [58, -1]
            ],
            [
                [2807, 3964],
                [-30, 0],
                [0, 174]
            ],
            [
                [2777, 4394],
                [5, 11],
                [17, 45]
            ],
            [
                [3045, 4302],
                [-6, -4],
                [3, 39]
            ],
            [
                [3042, 4343],
                [-4, 3],
                [-3, -28],
                [-1, -40],
                [-11, -9]
            ],
            [
                [2833, 2844],
                [-5, -10],
                [-6, -31],
                [-6, -49],
                [-1, -40],
                [-5, -31],
                [-6, 0],
                [-2, -23],
                [-6, -25],
                [-4, -28],
                [-6, -11],
                [-6, -29],
                [-1, -14],
                [-6, -16],
                [-6, -40]
            ],
            [
                [2107, 4590],
                [0, 380]
            ],
            [
                [2687, 3368],
                [57, -2]
            ],
            [
                [2398, 2049],
                [-5, -1],
                [-14, -26],
                [-6, 15],
                [-1, 31],
                [-3, -22],
                [-3, 5],
                [-1, -27],
                [3, -11],
                [0, -36],
                [-5, -37],
                [-9, -47],
                [-17, -51],
                [-2, 9],
                [-5, -13],
                [0, 12],
                [-7, -9],
                [-3, 24],
                [-2, -5],
                [7, -49],
                [-5, -16],
                [-5, 10],
                [-1, -35],
                [-7, -35],
                [-6, -66],
                [-4, -69],
                [-3, 5],
                [-1, -25],
                [3, 6],
                [-2, -50],
                [-2, -2],
                [0, -28],
                [3, -16],
                [1, -57],
                [3, -20],
                [0, -37],
                [3, -32],
                [-9, -20],
                [-3, 25],
                [-7, 10],
                [-9, -3],
                [-8, 32],
                [-5, 3],
                [-5, 25],
                [-6, 8],
                [-4, 24],
                [-2, 58],
                [-5, 34],
                [0, 30],
                [-2, 31],
                [1, 27],
                [-4, 30],
                [-3, 4],
                [-5, 27],
                [-1, 34],
                [-5, 32],
                [-6, 26],
                [-3, 57],
                [-2, 16],
                [-4, 46],
                [-1, 38],
                [-4, 27],
                [-6, 24],
                [-1, 16],
                [-6, 15],
                [-4, 42],
                [-13, 9],
                [-7, -2],
                [-7, 15],
                [-1, -20],
                [-7, -6],
                [-5, -40],
                [-3, -64],
                [-2, -1],
                [-4, -37],
                [-5, -1],
                [-7, 29],
                [-17, 47],
                [-4, 25],
                [-6, 24],
                [-5, 54],
                [-1, 49],
                [-4, 40],
                [-2, 35],
                [-3, 22],
                [-11, 32],
                [-6, 44],
                [-4, 15],
                [-6, 38],
                [-7, 20],
                [-5, 50],
                [-4, 11]
            ],
            [
                [1908, 4399],
                [0, -192],
                [57, 0]
            ],
            [
                [2981, 4973],
                [30, -2],
                [23, 2]
            ],
            [
                [2927, 3641],
                [-4, -32],
                [-3, -12],
                [-3, -44],
                [-6, -71],
                [-5, -15],
                [-1, 27],
                [2, 58],
                [8, 74]
            ],
            [
                [2874, 3756],
                [-4, -8],
                [-2, -28],
                [1, -19],
                [8, 6],
                [1, -31],
                [10, -12],
                [3, -24],
                [8, -26],
                [-4, -54],
                [4, -41],
                [-4, -20],
                [-1, -24],
                [4, -15],
                [-4, -23],
                [-6, 30],
                [-1, -10],
                [5, -22],
                [14, -5],
                [3, -71]
            ],
            [
                [2736, 3547],
                [-1, -16],
                [4, -32],
                [5, -16],
                [4, 1],
                [5, 25],
                [4, -20],
                [7, 11],
                [13, 36],
                [1, -11],
                [5, 17],
                [0, 34],
                [4, 30],
                [5, 29],
                [2, 34],
                [6, 36],
                [2, 44],
                [5, -27],
                [4, -8],
                [3, 16],
                [6, 68],
                [4, -17],
                [13, 77],
                [2, 57],
                [15, -64],
                [3, 37]
            ],
            [
                [1553, 5212],
                [-5, 7],
                [-4, -12],
                [-6, 17],
                [1, 26],
                [4, 14],
                [-6, 40],
                [-4, 103],
                [-2, 14],
                [-3, 73],
                [-6, 28],
                [-2, 56],
                [3, 38],
                [6, -18],
                [11, -24],
                [8, 1],
                [8, -9],
                [8, 9],
                [3, -16],
                [7, 1],
                [5, -42],
                [3, 3],
                [1, -56],
                [2, -52],
                [3, 6],
                [-3, 43],
                [1, 43],
                [4, 44],
                [-3, 18],
                [-1, 31],
                [-3, 35],
                [2, 25],
                [-2, 29],
                [-5, 4],
                [-4, 22],
                [1, 21],
                [163, 0]
            ],
            [
                [1576, 5602],
                [4, 9],
                [0, -39],
                [-5, 15],
                [1, 15]
            ],
            [
                [1568, 5655],
                [3, 25],
                [4, -30],
                [-1, -27],
                [-7, 8],
                [1, 24]
            ],
            [
                [2576, 4989],
                [-1, -23],
                [-6, -4],
                [-4, -44],
                [-2, -30],
                [3, -6],
                [5, 20],
                [4, 38],
                [6, 15],
                [5, 48],
                [6, 10],
                [-1, -25],
                [-4, -23],
                [-8, -79],
                [-2, -44],
                [0, -32],
                [-3, -10],
                [-2, -43],
                [1, -37],
                [-3, -24],
                [-3, -59],
                [0, -47],
                [4, -42],
                [-1, -55]
            ],
            [
                [2450, 5296],
                [6, -2],
                [20, 33],
                [8, 17],
                [2, -13],
                [-4, -25],
                [9, -33],
                [5, -3]
            ]
        ]
    }, m.prototype.usgTopo = "__USG__", m.prototype.uzbTopo = "__UZB__", m.prototype.vatTopo = "__VAT__", m.prototype.vctTopo = "__VCT__", m.prototype.venTopo = "__VEN__", m.prototype.vgbTopo = "__VGB__", m.prototype.virTopo = "__VIR__", m.prototype.vnmTopo = "__VNM__", m.prototype.vutTopo = "__VUT__", m.prototype.wlfTopo = "__WLF__", m.prototype.wsbTopo = "__WSB__", m.prototype.wsmTopo = "__WSM__", m.prototype.yemTopo = "__YEM__", m.prototype.zafTopo = "__ZAF__", m.prototype.zmbTopo = "__ZMB__", m.prototype.zweTopo = "__ZWE__", m.prototype.latLngToXY = function(a, b) {
        return this.projection([b, a])
    }, m.prototype.addLayer = function(a, b, c) {
        var d;
        return d = c ? this.svg.insert("g", ":first-child") : this.svg.append("g"), d.attr("id", b || "").attr("class", a || "")
    }, m.prototype.updateChoropleth = function(a, b) {
        var c = this.svg;
        b && b.reset === !0 && c.selectAll(".datamaps-subunit").attr("data-info", function() {
            return "{}"
        }).transition().style("fill", this.options.fills.defaultFill);
        for (var d in a)
            if (a.hasOwnProperty(d)) {
                var e, f = a[d];
                if (!d) continue;
                if (e = "string" == typeof f ? f : "string" == typeof f.color ? f.color : "string" == typeof f.fillColor ? f.fillColor : this.options.fills[f.fillKey], f === Object(f)) {
                    this.options.data[d] = l(f, this.options.data[d] || {});
                    this.svg.select("." + d).attr("data-info", JSON.stringify(this.options.data[d]))
                }
                c.selectAll("." + d).transition().style("fill", e)
            }
    }, m.prototype.updatePopup = function(a, b, c) {
        var d = this;
        a.on("mousemove", null), a.on("mousemove", function() {
            var e = n.mouse(d.options.element);
            n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("top", e[1] + 30 + "px").html(function() {
                var d = JSON.parse(a.attr("data-info"));
                try {
                    return c.popupTemplate(b, d)
                } catch (a) {
                    return ""
                }
            }).style("left", e[0] + "px")
        }), n.select(d.svg[0][0].parentNode).select(".datamaps-hoverover").style("display", "block")
    }, m.prototype.addPlugin = function(a, b) {
        var c = this;
        "undefined" == typeof m.prototype[a] && (m.prototype[a] = function(d, e, f, g) {
            var h;
            "undefined" == typeof g && (g = !1), "function" == typeof e && (f = e, e = void 0), e = l(e || {}, c.options[a + "Config"]), !g && this.options[a + "Layer"] ? (h = this.options[a + "Layer"], e = e || this.options[a + "Options"]) : (h = this.addLayer(a), this.options[a + "Layer"] = h, this.options[a + "Options"] = e), b.apply(this, [h, d, e]), f && f(h)
        })
    }, "object" == typeof exports ? (n = require("d3"), o = require("topojson"), module.exports = m) : "function" == typeof define && define.amd ? define("datamaps", ["require", "d3", "topojson"], function(a) {
        return n = a("d3"), o = a("topojson"), m
    }) : window.Datamap = window.Datamaps = m, window.jQuery && (window.jQuery.fn.datamaps = function(a, b) {
        a = a || {}, a.element = this[0];
        var c = new m(a);
        return "function" == typeof b && b(c, a), this
    })
}();
