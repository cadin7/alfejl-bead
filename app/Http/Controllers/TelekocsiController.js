'use strict'
const Category = use('App/Model/Category')
const Telekocsi = use('App/Model/Telekocsi')
const Validator = use('Validator')

class TelekocsiController {

    * list(req, res) {

        var telekocsis = yield Telekocsi.all();
         yield res.sendView('main', {
            telekocsis: telekocsis.toJSON(),
        });
    }

    * create(req, res) {
        const categories = yield Category.all();

        yield res.sendView('create', {
            categories: categories.toJSON(),
        });
    }

    * createNew(req, res) {
        var post = req.post();
        var userData={
            poster:post.poster,
            category_id:post.category_id,
            fromm:post.fromm,
            to:post.to,
            when:post.when,
            seats:post.seats,
            price:post.price,
            contact:post.contact
        };

        const validation = yield Validator.validateAll(userData, Telekocsi.rules)

         if (validation.fails()) {
             yield req
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('back')
            return
         }

        var telekocsi = yield Telekocsi.create(userData);
        yield telekocsi.save();
        res.redirect('/')
    }

    * show(req, res) {

        var telekocsi = yield Telekocsi.findBy('id', req.param('id'));
        
        yield res.sendView('show', {
            telekocsi: telekocsi.toJSON()
        });
    }

    * edit(req, res) {

        const categories = yield Category.all();
        var telekocsi=yield Telekocsi.findBy('id', req.param('id'));
        yield telekocsi.related('category').load()

        yield res.sendView('edit', {
            categories: categories.toJSON(),
            telekocsi: telekocsi.toJSON()
        });
    }


    * editSubmit(req, res) {
        var post = req.post();
        var telekocsi=yield Telekocsi.findBy('id', req.param('id'));
        
        telekocsi.poster=post.poster;
        telekocsi.fromm=post.fromm;
        telekocsi.to=post.to;
        telekocsi.when=post.when;
        telekocsi.seats=post.seats;
        telekocsi.category_id=post.category_id;        
        telekocsi.price=post.price;
        telekocsi.contact=post.contact;

        yield telekocsi.save();

        res.redirect('/');
    }

    * browse(req, res) {     
        var telekocsis = yield Telekocsi.all()
        yield res.sendView('browse', {
            telekocsis: telekocsis.toJSON(),
        });
    }


    * search(req, res) {
        var query = req.input('q') || '';
        var page = req.input('page') || 1;
        
        var telekocsis = yield Telekocsi.query()
            .where(function () {
                if(query!==''){
                    this.where('fromm','LIKE', '%'+query+'%')
                }
            })
            .with('category')
            .paginate(page, 9)
        yield res.sendView('search', {
            telekocsis: telekocsis.toJSON()
        });
    }

    * delete(req, res) {
        var telekocsi=yield Telekocsi.findBy('id', req.param('id'));
        
        yield telekocsi.delete();

        res.redirect('/');
    }

    * mylist(req, res) {
        const telekocsis = yield Telekocsi.all();

        yield res.sendView('mylist', {
            telekocsis: telekocsis.toJSON(),
        });
    }
}

module.exports = TelekocsiController
