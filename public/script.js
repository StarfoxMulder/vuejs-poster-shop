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

/** 11/27 Note
 * Within directives you can pass the source data array 
 * as the argument in a method.  
 * so for 'item in items' you can process items prior to rendering
 * like 'item in processedItems(items)'
 * if processedItems is defined within the methods 
 * parameter of the component where the method is called.
 */

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
/****
 * 
 * Components
 * 
 * Allow you to extend basic HTML elements to encapsulate reusable code.
 * A component can be thought of as a mini instance of Vue with it's
 * own properties, methods, etc that are isolated to that component 
 * 
 * Syntax for registering a component in Vue:
 * 
 * Vue.component('my-component', {
 *  template: '<div>{{ msg }}</div>',
 *  data() {
 *    msg: 'A custom component!'
 *  }
 * });
 * 
 * You can now used <my-component></my-component> as an HTML element!
 * Easier to manage the archetecture of an app with well structured components
 * 
 * For properties that could be shared/changed in an instance of a
 * component (regardless of if the component is used ones or multiple times),
 * Vue forces you to create that as a function of the component so that
 * changes made to one of the instacnes do not affect others -- otherwise
 * they would all share the same data array as the other instances, meaning
 * that a change to the data in one would render as a change to them all
 * ie. imagine iterating over an array of tweets, if the user liked one of them
 * the like would be triggered across all instances of the tweet component
 * (that's off the top of my head since I was just distracting myself with
 * twitter, but I generally think that's the idea -- it makes sense to me anyway)
 * 
 * You can used Vue directives within components, like v-for, to iterate over
 * arrays without having to manually code for each item in array.length.
 * With the Cinema project, we iterate over the genre in genres within the
 * template of the movie-filter component
 * 
 */
/****
 * 
 * Components - Props
 * https://www.udemy.com/vuejs-2-essentials/learn/v4/t/lecture/6539500?start=0
 * 
 * Components can be passed data from their parent through an HTML property
 * <div id="example">
 *   <my-component somedata="From the parent"></my-component>
 * </div> 
 * The component can use this data if it registers it as a "prop":
 * Vue.component('my-component', {
 *  template: '<div>{{ somedata }}</div>',
 *  props: ['somedata']
 * });
 * 
 * Props can be dynamic such that when the parent changes the data,
 * the child component receives the change
 * <my-compponent v-bind:somedata="parentdata"></my-component>
 * 
 * Child components can change data passed by props, but these changes
 * do not flow back up to the parent. Data can flow down, never up.
 * 
 */
/**
 * Custom Events
 * 
 * - If you need a parent to receive data from a child you can emit
 * a custom event from the child and have the parent listen to it
 * 
 * Vue.component('my-component', {
 *  template: '<div v-on:click="emitEvent"></div>',
 *  methods: {
 *    emitEvent() {
 *      this.$emit('customevent', 'From the child.');
 *    }
 *  }
 * });
 * 
 * <div id="example">
 *  <my-component v-on:customevent="eventHandler"></my-component>
 * </div>
 * 
 * new Vue ({
 *  el: '#example',
 *  methods: { eventHandler(msg) { //do stuff } }
 * });
 * 
 * the child emits the event with $ prefix and the parent
 * listens for that emit with the v-on custom event; the
 * parent receives the payload passed in the custom event --
 * the first argument of the custom event *must* be the 
 * title of the custom event and after that any number of
 * additional arguments can be passed into the custom event
 * 
 * Data transfered via emit can only go one level up, directly
 * from a child to its parent.  Therefore if you need to have
 * the data go up more than one level you have to pass it 
 * continuously up the tree
 * (Child -> Child's Parent -> Child's Grandparent -> Root)
 * Check out the cinema project for an example of this
 * 
 */
/****
 * 
 * Single File Components
 * 
 * Sort of like individual HTML files where you can isolate
 * <template> <script> <style> tags related to a specific 
 * component all within one file.  <template> is sort of like
 * your <main> tag.  You can use the component in your root
 * Vue instance or in another component.  SFC cannot be 
 * interpreted by a browser and so a build tool like Webpack
 * or Browserify is required
 * 
 * <div id="eample">
 *  <my-component></my-component>
 * </div>
 * 
 * new Vue({
 *  el: '#example',
 *  components: { import from 'myComponent.vue' }
 * });
 * 
 * Be mindful when refactoring to import referenced files 
 * (in the case of the movie project, genres from genres.js)
 * and to adjust the path since you're in the Components
 * directory instead of root.  
 * The portion of the script of the SFC dealing with what is
 * to be rendered by Webpack (the attributes of the component)
 * has to be wrapped in an 'export default {}' command.
 * 
 */
/*****
 * General reminder 
 * .then() method returns a Promise and takes two artuments:
 * callback functiosn for the success and failure cases
 * of the Promise
 * 
 * The $ symbol indicates that it is a public API method
 */
/****
 * When switching over from the dummy data to the API, be sure
 * to double-check the data structure of the API and that you're
 * referencing it correctly.
 */

/****
 * Moment.Js is useful for rendering time apparopriately when
 * the server and client are in different timezones
 */
/*****
 * Object.defineProperty() is a method that allows you to
 * add a property to an existing object. 
 * -- First argument is the object
 * -- Second is the new property's name
 * -- Third is what you want the property to be
 * For 'moment' the object we want to define an additional
 * property on is Vue.prototype since it's from there that
 * the components are created.
 * 
 * Since 'moment' is a property of the root instance of Vue,
 * we can essentially make $moment a shortcut public method
 * for "get() { return this.$root.moment }"
 */
/****
 * Handlebars Note
 * - You can pass a function into the {{}} to process the
 * template data prior to it rendering in the DOM
 * 
 * For example {{ formatSessionTime(session.time) }}
 * 
 * if formatSessionTime() is a method defined in the component
 */