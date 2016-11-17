'use strict'

const Validator = use('Validator')
const Category = use('App/Model/Category')
const Community = use('App/Model/Community')
const Player = use('App/Model/Player')
const Match = use('App/Model/Match')

const Database = use('Database')


 
class EloController {
     * main(request, response) {

      const categories = yield Category.all()

        for (let category of categories) {
        const topCommunities = yield category.communities().limit(3).fetch()
        category.topCommunities = topCommunities.toJSON()
        }

        yield response.sendView('main', {
        categories: categories.toJSON()
        }) 
    }


    * createCommunity (request, response) {
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/login')
        }

    const categories = yield Category.all();

        yield response.sendView('createCommunity', {
            categories: categories.toJSON(), 
        });
  }

  * createNewCommunity (request, response) {
    var post = request.post();
        var userData={
            name:post.name,
            category_id:post.category_id,
            owner:request.currentUser.username
        };

        const validation = yield Validator.validateAll(userData, Community.rules)

         if (validation.fails()) {
             yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            response.redirect('back')
            return
         }

        var community = yield Community.create(userData);
        yield community.save();
        response.redirect('/user/' + community.id)
  }


  * showCommunity(request, response) {
        const id = request.param('id')
        var community = yield Community.findBy('id', request.param('id'));
         if (!community) {
            response.notFound('Community not found.')
            return
        }
        //yield community.related('category').load()
               
        const category = yield Category.findBy('id',community.category_id);

        //const players = yield Player.findBy('community_id', community.id);
        //const players = yield Player.findBy('community_id', request.param('id'));
        //const players = yield Player.all()

        // const players = yield Player.query().orderBy('elo', 'desc').fetch()
        const players = yield Player.query().where('community_id', id).orderBy('elo', 'desc').fetch()

        if (!players){
             yield response.sendView('showCommunity', {
            community: community.toJSON(),
            category: category.toJSON()
        });
        }
        yield response.sendView('showCommunity', {
            community: community.toJSON(),
            category: category.toJSON(),
            players: players.toJSON()
        });
    }


    * listCommunities(request, response) {
         var query = request.input('name') || '';
        var page = request.input('page') || 1;
         
         const categories = yield Category.all();
         var communities = yield Community.query()
             .where(function () {
                 if(query!==''){
                     this.where('name','LIKE', '%'+query+'%')
                 }
             })
             .with('category')
             .paginate(page, 6)
         
         yield response.sendView('listCommunities', {
             communities: communities.toJSON(),
             categories: categories.toJSON()
         });
     }


    * listOwnCummunities(request, response) {
        
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/login')
        }

        const currtUser = request.currentUser.username;
       
        //EZ A JÓÓÓ!!! ::
        //const communities = yield Community.query().where('owner', currtUser).innerJoin('categories', 'communities.	category_id', 'categories.	category_id').orderBy('communities.name', 'asc').fetch()
        //const dumm = yield Database.select('name', 'category_id').from('communities')

        const communities = yield Community.query().where('owner', currtUser).orderBy('name', 'asc').fetch();   
        const categories = yield Category.all();
        //const communities = yield Database.from('communities', 'categories').select('community.name', 'category.name').where('  owner', currtUser).orderBy('name', 'asc').fetch()
        //const communities   = yield Database.from('users').select('*')

        yield response.sendView('ownCummunities', {
            communities: communities.toJSON(),
            categories: categories.toJSON()
        });
    }


    * deleteCommunity (request, response) {
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/login')
        }

        const currtUser = request.currentUser.username;
        const id = request.param('id');
        const community = yield Community.findBy('id', id)     
        if (!community) {
            response.notFound('Nincs ilyen közösség.')
            return
        }   

        if (community.owner != currtUser){
            response.unauthorized('Belépés megtagadva.')
        }
        
        yield community.delete()
        response.redirect('/user/list')
  }


  * editCommunity (request, response) {
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/login')
        }

        const currtUser = request.currentUser.username;
        const id = request.param('id');
        const community = yield Community.findBy('id', id)     
        if (!community) {
            response.notFound('Nincs ilyen közösség.')
            return
        }   

        if (community.owner != currtUser){
            response.unauthorized('Belépés megtagadva.')
        }

        const categories = yield Category.all();
        
        yield response.sendView('editCommunity', {
            categories: categories.toJSON(), 
            community: community.toJSON()
        });
  }


  * editSubmitCommunity (request, response) {

        var post = request.post();
        var userData={
            name:post.name,
            category_id:post.category_id
        };       

        const validation = yield Validator.validateAll(userData, Community.rules)

         if (validation.fails()) {
             yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            response.redirect('back')
            return
         }
        const commun_id = request.param('id');
        const community = yield Community.findBy('id', commun_id)
        community.name = userData.name
        community.category_id = userData.category_id
        yield community.save()
        response.redirect('/user/list')
  }



    * showOwnCommunity(request, response) {
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/login')
        }

        const currtUser = request.currentUser.username;
        const id = request.param('id');
        const community = yield Community.findBy('id', id)     
        if (!community) {
            response.notFound('Nincs ilyen közösség.')
            return
        }   

        if (community.owner != currtUser){
            response.unauthorized('Belépés megtagadva.')
        }
        
        //var community = yield Community.findBy('id', request.param('id'));         
        //yield community.related('category').load()
               
        const category = yield Category.findBy('id',community.category_id);
        //const players = yield Player.findBy('community_id', community.id);
        //const players = yield Player.findBy('community_id', request.param('id'));
        //const players = yield Player.all()
        // const players = yield Player.query().orderBy('elo', 'desc').fetch()
        const players = yield Player.query().where('community_id', id).orderBy('elo', 'desc').fetch()

        const matches = yield Match.query().where('community', id).orderBy('created_at', 'desc').fetch()

        if (!players){
             yield response.sendView('showOwnCommunity', {
            community: community.toJSON(),
            category: category.toJSON()
        });
        }
        yield response.sendView('showOwnCommunity', {
            community: community.toJSON(),
            category: category.toJSON(),
            players: players.toJSON(),  
            matches: matches.toJSON()
        });
    }



  * createMatch (request, response) {
        const isLoggedIn = yield request.auth.check()
        if (!isLoggedIn) {
            response.redirect('/login')
        }

        const currtUser = request.currentUser.username;
        const id = request.param('id');
        const community = yield Community.findBy('id', id)     
        if (!community) {
            response.notFound('Nincs ilyen közösség.')
            return
        }   

        if (community.owner != currtUser){
            response.unauthorized('Belépés megtagadva.')
        }
        
        yield response.sendView('createMatch');
  }


    * createNewMatch (request, response) {
        if (!request.currentUser){
            response.redirect('/')
        }

    const post = request.post();
    const commun_id = request.param('id');

        var matchData={
            player1:post.player1,
            player2:post.player2,
            result:post.result,
            date:post.date,
            community:commun_id
        };

        const validation = yield Validator.validateAll(matchData, Match.rules)

         if (validation.fails()) {
             yield request
                .withAll()
                .andWith({ errors: validation.messages() })
                .flash()

            response.redirect('back')
            return
         }

        const match = yield Match.create(matchData);
        yield match.save();

        var p1played;
        var p2played;
        var k1;
        var k2;

        var player1 = yield Player.findBy({name: matchData.player1, community_id: commun_id});    //'name',matchData.player1);
        if (!player1){
            const player1data={
                name:post.player1,
                elo:1500,
                community_id:commun_id
            };

            player1 = yield Player.create(player1data);
            yield player1.save();
           // player1 = yield Database.from('players').where('name', player1data.name);
            p1played = 1;
        } else {
            //var p1matches1 = yield Database.from('matches').where('player1', player1.name);
           // var p1matches2 = yield Database.from('matches').where('player2', player1.name);             

            var p1matches1 = yield Database.from('matches').where({player1 : player1.name, community: commun_id});
             var p1matches2 = yield Database.from('matches').where({player2 : player1.name, community: commun_id});
           p1played = p1matches1.length + p1matches2.length;
        }
        if (p1played < 30){
            k1 = 30; 
        } else {
            k1 = 15;
        }

        //var player2 = yield Player.findBy('name',matchData.player2);
        var player2 = yield Player.findBy({name: matchData.player2, community_id: commun_id});
        if (!player2){
            const player2data={
                name:post.player2,
                elo:1500,
                community_id:commun_id
            };

            player2 = yield Player.create(player2data);
            yield player2.save();
            //player2 = yield Database.from('players').where('name', player2data.name);
            p2played = 1;
        } else {
            //var p2matches1 = yield Database.from('matches').where('player1', player2.name);
            //var p2matches2 = yield Database.from('matches').where('player2', player2.name);

            var p2matches1 = yield Database.from('matches').where({player1 : player2.name, community: commun_id});
            var p2matches2 = yield Database.from('matches').where({player2 : player2.name, community: commun_id});
            p2played = p2matches1.length + p2matches2.length;
        }
        if (p2played < 30){
            k2 = 30; 
        } else {
            k2 = 15;
        }


        var r1 = Math.pow(10, player1.elo / 400);
        var r2 = Math.pow(10, player2.elo / 400);

        var e1 = r1 / (r1 + r2); 0.5
        var e2 = r2 / (r1 + r2);

        var s1 = 2 - post.result; 1
        var s2 = post.result - 1;

        var newElo1 = Math.round(player1.elo + k1 * (s1 - e1));
        var newElo2 = Math.round(player2.elo + k2 * (s2 - e2));

        player1.elo = newElo1;
        yield player1.save();

        player2.elo = newElo2;
        yield player2.save();
        response.redirect('/user/' + commun_id)
  }



/*
      * deleteMatch (request, response) {
            const community_id = request.param('id');
            const match_id = request.param('matchid');

            const match = yield Match.findBy('id', match_id)
            if (!match) {
                response.notFound('Match not found.')
                return
            }
            //yield match.delete()

            response.redirect('/user/' + community_id)
        }
*/


    

}

module.exports = EloController
