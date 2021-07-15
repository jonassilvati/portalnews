<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\News as NewsResource; 
use App\Models\News;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return NewsResource::collection(News::all());
    }

   
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required'            
        ]);

        $news = new News();
        $news->title = $request->title;
        $news->content = $request->content;
        $news->category()->associate($request->category);
        $news->save();

        return response()->json([
            'data' => 'Notícia cadastrada'
        ]);    
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return new NewsResource(News::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $request->validate([
            'title' => 'required'            
        ]);

        $news = News::findOrFail($id);
        $news->title = $request->title;
        $news->content = $request->content;
        $news->category()->associate($request->category);
        $news->save();

        return response()->json([
            'data' => 'Notícia atualizada'
        ]);    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $news->delete();

        return response()->json([
            'data' => 'Notícia deletada'
        ]);    

    }

    /**
     * Pesquisa nos posts
     */
    public function search(Request $request, $s){

        return NewsResource::collection(
            News::where('title','like',"%{$s}%")
                ->orWhere('content','like',"%{$s}%")
                ->get()
        );       
    }

    /**
     * Pegar news por categoria
     */
    public function byCategory(Request $request, $id){

        return NewsResource::collection(News::where('category_id', $id)->get());        

    }
}
