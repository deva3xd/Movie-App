<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index() {
        return Inertia::render('Home/Page');
    }

    public function show($id, $ongoing) {
        $items = Cart::where('user_id', Auth::id())->where('movie_id', $id)->get();
        return Inertia::render('Home/Detail', ['id' => $id, 'items' => $items, 'ongoing' => $ongoing]);
    }
}