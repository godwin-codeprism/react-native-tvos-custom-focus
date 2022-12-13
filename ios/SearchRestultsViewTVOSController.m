//
//  SearchRestultsViewTVOSController.m
//  FocusPOC
//
//  Created by Godwin Vinny Carole Kati on 09/12/22.
//

#import "SearchResultsViewTVOSController.h"

@implementation SearchResultsViewTVOSController

-(instancetype)initWithReactViewController:(UIViewController *)reactViewController {
  if(self = [super init]){
    _reactViewController = reactViewController;
    return self;
  }
  return nil;
}

- (void) viewDidLoad {
  [super viewDidLoad];
  
  [self.view addSubview:self.reactViewController.view];
}

@end
