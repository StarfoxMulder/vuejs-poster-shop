console.log('It works.');
console.log(Vue);

/**
 * This is the straight up version of the project;
 * script2.js has working prices associated with the 
 * native items array until we began inegrating the 
 * search feature -- easier to focus on learning Vue
 * this way, but for demo purproses maybe assign each
 * item[] after this.items = res.data a random price
 * --- 
 * or grab an API that does return actual products or
 * whatever and modify code to perform a real function.
 */

var PRICE = 9.69;
var LOAD_NUM = 15;

new Vue({
  //Root element
  //gives Vue access to all children
  el: '#app',
  //anything inside of data
  //will be accessible to the DOM
  //assign using handlebars syntax
  data: {
    total: 0,
    items: [],
    cart: [],
    results: [],
    newSearch:'turtle',
    lastSearch: '',
    loading: false,
    price: PRICE
  },
  methods: {
    addItem: function(index) {
      var item = this.items[index];
      var found = false;
      for (var i=0; i < this.cart.length; i++){
        if(this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
          break;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: PRICE
        });
      }
      this.total += PRICE;
    },
    inc: function(item){
      item.qty++;
      this.total+= PRICE;
    },
    dec: function(item){
      item.qty--;
      this.total-= PRICE;
      // removing item from the cart if its qty == 0
      if(item.qty <= 0){
        for(var i=0; i < this.cart.length; i++){
          if(this.cart[i].id === item.id){
            this.cart.splice(i, 1);
            break;
          }
        } 
      }
    },
    onSubmit: function() {
      if(this.newSearch.length){
        this.items = [];
        this.results = [];
        this.loading = true;
        this.$http
          .get('/search/'.concat(this.newSearch))
          .then(function(res) {
            this.lastSearch = this.newSearch;
            this.results = res.data;
            console.log(this.results);
            this.appendItems();
            this.loading = false;
            console.log(this.results);
            console.log(this.items);
          })
        ;
      }
    },
    appendItems: function() {
      if (this.items.length < this.results.length){
        //genius way to consistently increase the number
        // of displayed items!!!

        var append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
        this.items = this.items.concat(append);
      }
    }
  }, //End Methods
  computed: {
    noMoreItems: function(){
      // Computed Values method
      console.log("noMoreItems firing");
      return this.items.length === this.results.length && this.results.length > 0;
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
  },
  mounted: function() {
    this.onSubmit();

      //Since scrollMonitor is a 3rd party plugin
      // it does not have access to the Vue instance
      // assigned to 'this'; assigning 'this' as a
      // variable within scope of the 3rd party
      // plugin is a way around this limitation
    var vueInstance = this;
    var elem = document.getElementById('product-list-bottom');
    var watcher = scrollMonitor.create(elem);
    watcher.enterViewport(function(){
      vueInstance.appendItems();
    });
  }
});

//Directives are declaired with
// a v- prefix to a single
// javascript expression
// v-if or v-bind or v-for
//
//Directives can take an argument
// if you include them in ""
// <a v-bind:href="url"></a>
//
//In v-for the first argument 
// is an alias for the individual
// entries of the array
// So saying "item in items"
// is like saying
// "person in humanity"
// to iterate over each person
// in your humanity array.
// The alias does not have to be
// a perfect singularization of 
// the "group" form of the 
// collective noun --
// similarly "person in people"
// works to illustrate the alias 
// feature of these kind of iterators
//
// Wrapping the alias in parens
// allows us to pass multiple 
// properties of aliases(aliai?)
// into the assoicated function.
// Here we're passing item and 
// the item's index to addItem()
// since both tie into addItem()
//
// vue-resource allows for using http requests
//
// 'this' in vue refers to the Vue instance.
//
// lifecycle hooks of Vue:
// -Vue instance foes through a series of
// initalization steps when it is created
// -Needs to set up data observation, compile
// the template, mount to the DOM, etc
// -Lifecycle hooks give us an opportunity to
// execute custom logic at each point
// -Hooks include creates, mounted, updated, destroyed
// see API docs for more lifecycle hooks
/**
 * utilizing the lifecycle hooks makes for a better
 * user experience
 * you can load content prior to user interaction
 * after the default DOM content has been mounted
 * or other options to facilitate interation and 
 * ease of use -- similarly utilizing methods to 
 * cleanse data/DOM tree elements 
 */
/**
 * Transitions
 * - Are used in conjunction with v-if, v-show, etc
 * - Use a non-rendering component called transition
 * - If you name your transition you can name your
 * css classes appropriately. if not, Vue will look
 * for general v-enter, v-active, etc.
 * -- For example, using the name="fade" gives access
 * to fade-enter-active, fade-enter, and fade-leave-active
 * css class properties (set in your css sheet, not Vue)
 * 
 */
/**
 * Key
 * ** Creating a hard link to your data array and the DOM
 * use v-bind to create a key for individual items
 * in a list/array of a transition-group, otherwise
 * Vue will not bind them correctly to the DOM
 * 
 */
/**
 * Computed Values
 * - you can data-bind to computed properties in
 *  templates just like a normal property
 * - Vue is aware of the data that a computed propery depends
 * on so it will update any bindings when the dependency changes
 * 
 * data: { myPropA: 2, myProp2: 4},
 * computed: {
 *   myComputedProp: function() {
 *     return this.myPropA * this.myPropB * 2;
 *   }
 * }
 * 
 *  - Methods are not reative on thier own.
 *  With the Computed property, Vue will watch for all the dependent
 * values and recall the function each time one of those values changes
 * 
 */
/*****
 * 
 * To target an element for styling based on it's Vue directive,
 * enclose the Vue directive name in [] on the CSS sheet:
 * 
 * [v-cloak] {
 *   display: none;
 * }
 * 
 */