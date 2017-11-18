console.log('It works.');
console.log(Vue);

new Vue({
  //Root element
  //gives Vue access to all children
  el: '#app',
  //anything inside of data
  //will be accessible to the DOM
  //assign using handlebars syntax
  data: {
    total: 0,
     items: [
      {id: 1, title: 'Mothman Dust', price: 6.90},
      {id: 2, title: 'Bigfoot Dick', price: 69.69},
      {id: 3, title: 'Illuminati Coin', price: 33.33}
    ],
  cart: [],
  search:''
  },
  methods: {
    addItem: function(index) {
      var item = this.items[index];
      var found = false;
      for (var i=0; i < this.cart.length; i++){
        if(this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
          this.total += item.price;
          break;
        }
      }
      if (!found) {
        this.cart.push({
          id: item.id,
          title: item.title,
          qty: 1,
          price: item.price
        });
        var newItemIndex = this.cart.length -1;
        this.total += this.cart[newItemIndex].price;
      }
    },
    inc: function(item){
      item.qty++;
      this.total+= item.price;
    },
    dec: function(item){
      item.qty--;
      this.total+= item.price;
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
      console.log(this.$http);
    }
  },
  filters: {
    currency: function(price) {
      return '$'.concat(price.toFixed(2));
    }
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
// 
