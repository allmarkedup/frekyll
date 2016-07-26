'use strict';

const _          = require('lodash');
const Path       = require('path');
const fs         = require('fs');
const Promise    = require('bluebird');
const tinyliquid = require('tinyliquid');
const Adapter    = require('@frctl/fractal').Adapter;

class FrekyllAdapter extends Adapter {

    constructor(engine, source) {
        super(engine, source);
    }

    render(path, str, context, meta) {
        const engine = this._engine;
        const source = this._source;

        var render = Promise.promisify(tinyliquid.compile(str));
        var ctx = tinyliquid.newContext({
            locals: context
        });

        ctx.onInclude((name, callback) => {
            var extname  = Path.extname(name) ? '' : source.get('ext');
            var filename = Path.resolve(source.fullPath, name + extname);
            fs.readFile(filename, 'utf8', function (err, data){
                if (err) return callback(err);
                callback(null, engine.parse(data));
            });
        });

        return render(ctx);
    }

}

module.exports = function(config) {

    config = config || {};

    return {

        register(source, app) {
            return new FrekyllAdapter(tinyliquid, source);
        }
        
    }

};
