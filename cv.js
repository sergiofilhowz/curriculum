#!/usr/bin/env node

var jade = require('jade');
var html = jade.renderFile('cv.jade', {pretty : true});
var fs = require('fs');
var phantom = require('phantom');

fs.writeFile('cv.html', html, function(err) {
    if(err) {
        console.log('Falha ao Gerar o Curriculum');
        return;
    } 

    phantom.create(function (ph) {
    	ph.createPage(function (page) {
    		page.set('paperSize', {
				format: 'A4',
				margin: '2cm'
			});
    		page.open('cv.html', function (status) {
			    page.render('cv.pdf', {format: 'pdf'});
			    ph.exit();
			    console.log('Curriculum Gerado!');
			});
    	});
    });
});