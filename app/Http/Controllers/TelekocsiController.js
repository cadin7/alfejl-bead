'use strict'
const Category = use('App/Model/Category')
const Telekocsi = use('App/Model/Telekocsi')
const Validator = use('Validator')
const Favorite = use('App/Model/Favorite')
const Database = use('Database')

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
        
        var fav = null;
        if(req.currentUser != null){
        var favorite = yield Favorite.query().where(function(){
            this.where('telekocsi_id', req.param('id'))
            this.where('user_id', req.currentUser.username)
        })
        }
        
        if(favorite == null){
            favorite = new Favorite( {id: 0,
                    telekocsi_id: 0,
                    user_id: '0',
                    created_at: '0',
            updated_at: '0'} )
        }
        yield res.sendView('show', {
            telekocsi: telekocsi.toJSON(),
            favorite: favorite
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
            .paginate(page, 3)
        yield res.sendView('search', {
            telekocsis: telekocsis.toJSON()
        });
    }

    * delete(req, res) {
        var telekocsi = yield Telekocsi.findBy('id', req.param('id'));
        var favorite = yield Favorite.findBy('telekocsi_id', req.param('id'));
        yield telekocsi.delete();
        yield favorite.delete();

        res.redirect('/');
    }

    * mylist(req, res) {
        const telekocsis = yield Telekocsi.all();

        yield res.sendView('mylist', {
            telekocsis: telekocsis.toJSON(),
        });
    }

    //2. Kieg

     * addToFavorites(req, res){
        var post = req.post();
        var telekocsiData = {
            telekocsi_id: post.id,
            user_id: post.poster
        }

        var favorite = yield Favorite.create(telekocsiData);
        yield favorite.save();

        res.redirect('/');
    }

     * myfavorites(req, res) {
        const favorites = yield Favorite.all();
        const telekocsis = yield Telekocsi.all();

        yield res.sendView('showfavorites', {
            favorites: favorites.toJSON(),
            telekocsis: telekocsis.toJSON()
        });
    }

    * deleteFavorite(req, res) {
        let favorite = Database.table('favorites').where(function(){
            this.where('telekocsi_id',req.input('id'))
            this.where('user_id',req.input('poster'))
        })
 
        yield favorite.delete();

        res.redirect('/');
    }

     * ajaxSearch(req, res){
        var query = req.input('q');
        if(!query){
            res.ok([]);
            return;
        }

        var telekocsis = yield Telekocsi.query()
        .where(function () {
            this.where('fromm','LIKE', '%'+query+'%')
        });

        res.ok(telekocsis);
    }

    * ajaxDelete(req, res) {
     const id = req.param('id');
     const telekocsi = yield Telekocsi.find(id);

     if (telekocsi) {
        if (req.currentUser.username !== telekocsi.poster) {
            res.unauthorized('Access denied.')
            return
        }

        yield telekocsi.delete()
        res.ok({
            success: true
        })
        return
        }
        res.notFound('A hirdetés nem található')
    }

    * ajaxReserv(req, res) {
     const id = req.param('id');
     const telekocsi = yield Telekocsi.find(id);

     if (telekocsi) {
        if (req.currentUser.username !== telekocsi.poster) {
            res.unauthorized('Access denied.')
            return
        }
        }
        res.notFound('A hirdetés nem található')
    }
}

module.exports = TelekocsiController
