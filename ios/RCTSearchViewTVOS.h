//
//  RCTSearchViewTVOS.h
//  FocusPOC
//
//  Created by Godwin Vinny Carole Kati on 09/12/22.
//

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>

@interface RCTSearchViewTVOS : UIView

@property UISearchContainerViewController *containerVC;

@property (nonatomic, copy) RCTBubblingEventBlock onChangeText;

@end
